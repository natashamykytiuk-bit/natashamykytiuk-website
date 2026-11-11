/* =========================================================
	SITE CODE: shared by every page. Content lives in js/data.js;
	you shouldn't need to edit this file.
	Each page sets <body data-page="home|experience|projects|project">.
========================================================= */

function el(tag, attrs, children) {
	const node = document.createElement(tag);
	for (const [k, v] of Object.entries(attrs || {})) {
		if (k === "text") node.textContent = v;
		else node.setAttribute(k, v);
	}
	for (const child of children || []) if (child) node.appendChild(child);
	return node;
}

function linkButton(label, href, style, ariaLabel) {
	if (!href || href === "#") return null;
	const external = /^https?:/.test(href);
	const attrs = { class: "btn btn-sm " + style, href: href, text: label };
	if (ariaLabel) attrs["aria-label"] = ariaLabel;
	if (external) { attrs.target = "_blank"; attrs.rel = "noopener noreferrer"; }
	return el("a", attrs);
}

// Turns "Built a **Firebase** backend" into text with <strong>Firebase</strong>
function rich(tag, text, attrs) {
	const node = el(tag, attrs);
	text.split("**").forEach((part, i) => {
		if (i % 2) node.appendChild(el("strong", { text: part }));
		else node.append(part);
	});
	return node;
}

function tagList(items) {
	return el("ul", { class: "tags" }, items.map(t => el("li", { class: "tag", text: t })));
}

function projectUrl(p) {
	return "project.html?p=" + encodeURIComponent(p.slug);
}

/* ---------- Home page ---------- */

function renderAbout() {
	const title = document.getElementById("about-title");
	title.textContent = "";
	PROFILE.greeting.split("👋").forEach((part, i) => {
		if (i) title.appendChild(el("span", { class: "wave", role: "img", "aria-label": "waving hand", text: "👋" }));
		title.appendChild(document.createTextNode(part));
	});

	const intro = document.getElementById("intro");
	PROFILE.intro.forEach(text => intro.appendChild(rich("p", text)));

	const facts = document.getElementById("facts");
	PROFILE.facts.forEach(f => facts.appendChild(el("span", { text: f })));

	document.getElementById("hero-buttons").append(
		el("a", { class: "btn btn-primary", href: PROFILE.resume, download: "", text: "Download Resume" }),
		el("a", { class: "btn btn-outline", href: PROFILE.github, target: "_blank", rel: "noopener noreferrer", text: "GitHub" }),
		el("a", { class: "btn btn-outline", href: PROFILE.linkedin, target: "_blank", rel: "noopener noreferrer", text: "LinkedIn" })
	);
}

function renderCollage() {
	const photos = (PROFILE.photos || []).slice(0, 5);
	if (!photos.length) return;
	const collage = document.getElementById("hero-collage");
	collage.setAttribute("role", "group");
	collage.setAttribute("aria-label", "Photos of Natasha and her work with UBC Solar");
	photos.forEach((ph, i) => collage.appendChild(
		el("div", { class: "photo" }, [el("img", { src: ph.src, alt: ph.alt || "", loading: i ? "lazy" : "eager" })])
	));
	collage.hidden = false;
	collage.closest(".hero").classList.add("has-collage");
}

function renderExperience(full) {
	const wrap = document.getElementById("experience-list");
	EXPERIENCE.filter(g => full || !g.fullPageOnly).forEach(group => {
		const entries = group.entries.filter(e => full || !e.fullPageOnly);
		if (!entries.length) return;
		wrap.appendChild(el("h3", { class: "exp-group-title", text: group.group }));
		wrap.appendChild(el("div", { class: "exp-list" }, entries.map(e => {
			// An entry can hold one role, or several roles at the same place under "roles"
			const roles = e.roles || [{ role: e.role, dates: e.dates, points: e.points }];
			const meta = (r) => [e.location, r.dates].filter(Boolean).join(" · ");
			const body = roles.length === 1
				? [
					el("div", { class: "exp-head" }, [el("h3", { text: e.org }), el("span", { class: "meta", text: meta(roles[0]) })]),
					el("p", { class: "role", text: roles[0].role }),
					el("ul", { class: "points" }, roles[0].points.map(p => rich("li", p)))
				]
				: [el("h3", { text: e.org })].concat(roles.map(r => el("div", { class: "exp-role" }, [
					el("div", { class: "exp-head" }, [el("p", { class: "role", text: r.role }), el("span", { class: "meta", text: meta(r) })]),
					el("ul", { class: "points" }, r.points.map(p => rich("li", p)))
				])));
			return el("article", { class: "exp" + (e.logo ? " has-logo" : "") }, [
				e.logo ? el("img", { class: "exp-logo", src: e.logo, alt: e.org + " logo", width: "56", height: "56", loading: "lazy" }) : null,
				el("div", { class: "exp-body" }, body)
			]);
		})));
	});
}

// Skill name -> icon file in img/skills/ (brand icons from Simple Icons; gear/chip/doc/code are generic).
const SKILL_ICONS = {
	"Python": "python", "Java": "openjdk", "JavaScript": "javascript", "C/C++": "cplusplus",
	"SystemVerilog": "chip", "MATLAB": "code",
	"React Native": "react", "Firestore": "firebase", "Firebase": "firebase", "Cloud Functions": "googlecloud",
	"LLM Integration": "anthropic", "Systems Design": "gear", "Backend Architecture": "code",
	"Accessibility-Focused UI Design": "figma",
	"Arduino": "arduino", "FPGA (Intel MAX 10)": "intel", "FreeRTOS": "chip", "CAN": "chip",
	"Servo Control": "gear", "Sensor Calibration": "gear", "Closed-Loop Control": "gear",
	"Aconex": "oracle", "Bluebeam": "doc", "SOLIDWORKS": "dassaultsystemes", "Intel Quartus Prime": "intel",
	"MS Office Suite": "doc", "SharePoint": "doc",
	"Git": "git", "GitHub": "github", "Claude Code": "claude", "Figma": "figma", "Photoshop": "adobephotoshop"
};

function skillTile(name) {
	const icon = SKILL_ICONS[name] || "gear";
	const i = el("span", { class: "skill-icon", "aria-hidden": "true" });
	const src = `url("img/skills/${icon}.svg")`;
	i.style.webkitMaskImage = src;
	i.style.maskImage = src;
	return el("li", { class: "skill" }, [i, el("span", { class: "skill-name", text: name })]);
}

function renderSkills() {
	const grid = document.getElementById("skills-grid");
	SKILLS.forEach(g => grid.appendChild(
		el("div", { class: "skill-group" }, [el("h3", { text: g.category }), el("ul", { class: "skill-tiles" }, g.items.map(skillTile))])
	));
}

function renderValues() {
	if (!VALUES.length) { document.getElementById("values").remove(); return; }
	const grid = document.getElementById("values-grid");
	VALUES.forEach(v => grid.appendChild(
		el("div", { class: "value" }, [el("h3", { text: v.title }), el("p", { text: v.text })])
	));
}

function renderContact() {
	const list = document.getElementById("contact-list");
	[
		["Email", "mailto:" + PROFILE.email, PROFILE.email.replace("@", "[at]")],
		["LinkedIn", PROFILE.linkedin, PROFILE.linkedin.replace(/^https?:\/\/(www\.)?/, "")],
		["GitHub", PROFILE.github, PROFILE.github.replace(/^https?:\/\//, "")]
	].forEach(([label, href, text]) => {
		const li = el("li", {}, [el("span", { text: label })]);
		const a = el("a", { href: href, text: text });
		if (href.startsWith("http")) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
		li.appendChild(a);
		list.appendChild(li);
	});
}

/* ---------- Project cards (home + projects page) ---------- */

function projectCard(p) {
	const url = projectUrl(p);
	const cover = (p.photos || [])[0];
	return el("article", { class: "card" }, [
		// No photo yet: the card shows just the name and description
		cover ? el("a", { class: "card-media", href: url, tabindex: "-1", "aria-hidden": "true" }, [
			el("img", { src: cover.src, alt: cover.alt || "", loading: "lazy" })
		]) : null,
		el("div", { class: "card-body" }, [
			el("h3", {}, [el("a", { class: "card-title", href: url, text: p.title })]),
			p.subtitle ? el("p", { class: "subtitle", text: p.subtitle }) : null,
			el("p", { class: "summary", text: p.summary }),
			tagList(p.tags),
			el("a", { class: "learn-more", href: url, "aria-label": "Learn more about " + p.title, text: "Learn more" })
		])
	]);
}

function renderProjectGrid(gridId, list) {
	const grid = document.getElementById(gridId);
	list.forEach(p => grid.appendChild(projectCard(p)));
}

/* ---------- Single project page ---------- */

function renderProjectPage() {
	const slug = new URLSearchParams(location.search).get("p");
	const index = PROJECTS.findIndex(p => p.slug === slug);
	const main = document.getElementById("project");

	if (index === -1) {
		document.title = "Project not found | " + PROFILE.name;
		main.append(
			el("p", { class: "eyebrow", text: "Projects" }),
			el("h1", { class: "project-title", text: "Project not found" }),
			el("p", { class: "project-lead", text: "That project doesn't exist or has moved." }),
			el("a", { class: "btn btn-outline", href: "projects.html", text: "See all projects" })
		);
		return;
	}

	const p = PROJECTS[index];
	document.title = p.title + " | " + PROFILE.name;
	const meta = document.querySelector('meta[name="description"]');
	if (meta) meta.setAttribute("content", p.summary);

	const photos = p.photos || [];
	const slideshow = photos.length ? makeSlideshow(photos, p.title) : null;

	const about = p.about || [];
	const why = p.why || [];
	const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
	const next = PROJECTS[(index + 1) % PROJECTS.length];

	main.append(
		el("a", { class: "back-link", href: "projects.html", text: "All projects" }),
		el("header", { class: "project-header" }, [
			p.subtitle ? el("p", { class: "eyebrow", text: p.subtitle }) : null,
			el("h1", { class: "project-title", text: p.title }),
			el("p", { class: "project-lead", text: p.summary }),
			tagList(p.tags),
			el("div", { class: "btn-row" }, [
				linkButton("GitHub", p.github, "btn-outline", p.title + " on GitHub"),
				linkButton(p.demoLabel || "Demo", p.demo, "btn-primary", p.title + " " + (p.demoLabel || "demo"))
			])
		]),
		// Photos on the left (they stay in view while you scroll), write-up on the right
		el("div", { class: "project-layout" + (slideshow ? " has-photos" : "") }, [
			slideshow,
			el("div", { class: "project-body" }, [
				why.length ? el("section", { class: "project-section" }, [
					el("h2", { text: "Why I built this" }),
					...why.map(t => rich("p", t))
				]) : null,
				about.length ? el("section", { class: "project-section" }, [
					el("h2", { text: "Overview" }),
					...about.map(t => rich("p", t))
				]) : null,
				el("section", { class: "project-section" }, [
					el("h2", { text: "What I did" }),
					el("ul", { class: "points" }, p.points.map(pt => rich("li", pt)))
				])
			])
		]),
		el("nav", { class: "project-pager", "aria-label": "More projects" }, [
			el("a", { class: "pager-prev", href: projectUrl(prev) }, [el("span", { text: "Previous" }), el("strong", { text: prev.title })]),
			el("a", { class: "pager-next", href: projectUrl(next) }, [el("span", { text: "Next" }), el("strong", { text: next.title })])
		])
	);
}

// Photo slideshow: arrow buttons, dots, counter, captions, keyboard arrows, and swipe.
// No autoplay, so visitors stay in control.
function makeSlideshow(photos, title) {
	let current = 0;
	const many = photos.length > 1;

	const slides = photos.map((ph, i) => {
		const fig = el("figure", { class: "slide" + (i === 0 ? " is-active" : ""), role: "group", "aria-roledescription": "slide", "aria-label": (i + 1) + " of " + photos.length }, [
			el("img", { src: ph.src, alt: ph.alt || "", loading: i === 0 ? "eager" : "lazy", draggable: "false" })
		]);
		if (i !== 0) fig.setAttribute("aria-hidden", "true");
		return fig;
	});
	const stage = el("div", { class: "slides" }, slides);

	const caption = el("p", { class: "slide-caption", "aria-live": "polite" });
	const counter = el("span", { class: "slide-count" });
	const dots = photos.map((ph, i) => {
		const d = el("button", { class: "slide-dot", type: "button", "aria-label": "Show photo " + (i + 1) });
		d.addEventListener("click", () => show(i));
		return d;
	});
	const prevBtn = el("button", { class: "slide-btn slide-prev", type: "button", "aria-label": "Previous photo" }, [el("span", { "aria-hidden": "true", text: "‹" })]);
	const nextBtn = el("button", { class: "slide-btn slide-next", type: "button", "aria-label": "Next photo" }, [el("span", { "aria-hidden": "true", text: "›" })]);
	prevBtn.addEventListener("click", () => show(current - 1));
	nextBtn.addEventListener("click", () => show(current + 1));

	function show(i) {
		current = (i + photos.length) % photos.length;
		slides.forEach((s, j) => {
			const on = j === current;
			s.classList.toggle("is-active", on);
			if (on) s.removeAttribute("aria-hidden");
			else s.setAttribute("aria-hidden", "true");
		});
		dots.forEach((d, j) => {
			if (j === current) d.setAttribute("aria-current", "true");
			else d.removeAttribute("aria-current");
		});
		caption.textContent = photos[current].caption || "";
		caption.hidden = !photos[current].caption;
		counter.textContent = (current + 1) + " / " + photos.length;
		if (viewer && viewer.open) fillViewer();
	}

	// ---- Full-screen viewer (a native <dialog>: Esc closes it and focus stays inside) ----
	let viewer = null, vImg, vCaption, vCount;
	function buildViewer() {
		vImg = el("img", { class: "viewer-img", alt: "" });
		vCaption = el("p", { class: "viewer-caption" });
		vCount = el("span", { class: "viewer-count" });
		const close = el("button", { class: "viewer-btn viewer-close", type: "button", "aria-label": "Close full screen" }, [el("span", { "aria-hidden": "true", text: "×" })]);
		const vPrev = el("button", { class: "viewer-btn viewer-prev", type: "button", "aria-label": "Previous photo" }, [el("span", { "aria-hidden": "true", text: "‹" })]);
		const vNext = el("button", { class: "viewer-btn viewer-next", type: "button", "aria-label": "Next photo" }, [el("span", { "aria-hidden": "true", text: "›" })]);
		close.addEventListener("click", () => closeViewer());
		vPrev.addEventListener("click", () => show(current - 1));
		vNext.addEventListener("click", () => show(current + 1));
		viewer = el("dialog", { class: "viewer", "aria-label": title + " photos, full screen" }, [
			el("div", { class: "viewer-stage" }, [vImg]),
			many ? vPrev : null,
			many ? vNext : null,
			close,
			el("div", { class: "viewer-bar" }, [vCaption, many ? vCount : null])
		]);
		// Click the dark background (not the photo or buttons) to close
		viewer.addEventListener("click", e => {
			if (e.target === viewer || e.target.classList.contains("viewer-stage")) closeViewer();
		});
		viewer.addEventListener("keydown", e => {
			if (e.key === "Escape") { e.preventDefault(); closeViewer(); return; }
			if (!many) return;
			if (e.key === "ArrowLeft") { e.preventDefault(); show(current - 1); }
			if (e.key === "ArrowRight") { e.preventDefault(); show(current + 1); }
		});
		// Swipe inside the viewer
		let sx = null;
		viewer.addEventListener("pointerdown", e => { sx = e.clientX; });
		viewer.addEventListener("pointerup", e => {
			if (sx === null || !many) return;
			const dx = e.clientX - sx;
			sx = null;
			if (Math.abs(dx) > 40) show(current + (dx < 0 ? 1 : -1));
		});
		// Backup for any other way the browser closes the dialog
		viewer.addEventListener("close", () => closeViewer());
		document.body.appendChild(viewer);
	}
	function fillViewer() {
		const ph = photos[current];
		vImg.src = ph.src;
		vImg.alt = ph.alt || "";
		vCaption.textContent = ph.caption || "";
		vCount.textContent = (current + 1) + " / " + photos.length;
	}
	function closeViewer() {
		if (viewer.open) viewer.close();
		if (!document.documentElement.classList.contains("viewer-open")) return;
		document.documentElement.classList.remove("viewer-open");
		expandBtn.focus();
	}
	function openViewer() {
		if (!viewer) buildViewer();
		fillViewer();
		document.documentElement.classList.add("viewer-open");
		viewer.showModal();
	}

	const expandBtn = el("button", { class: "slide-expand", type: "button", "aria-label": "View photo full screen" }, [el("span", { "aria-hidden": "true", text: "⤢" })]);
	expandBtn.addEventListener("click", () => openViewer());

	const root = el("section", { class: "slideshow", "aria-roledescription": "carousel", "aria-label": title + " photos" }, [
		el("div", { class: "slides-frame" }, [stage, many ? prevBtn : null, many ? nextBtn : null, expandBtn]),
		many ? el("div", { class: "slide-controls" }, [el("div", { class: "slide-dots" }, dots), counter]) : null,
		caption
	]);

	if (many) {
		// Left/right arrow keys while the slideshow has focus
		root.addEventListener("keydown", e => {
			if (e.key === "ArrowLeft") { e.preventDefault(); show(current - 1); }
			if (e.key === "ArrowRight") { e.preventDefault(); show(current + 1); }
		});
		// Swipe on touch screens
		let startX = null;
		stage.addEventListener("pointerdown", e => { startX = e.clientX; });
		stage.addEventListener("pointerup", e => {
			if (startX === null) return;
			const dx = e.clientX - startX;
			startX = null;
			if (Math.abs(dx) > 40) show(current + (dx < 0 ? 1 : -1));
			else openViewer();
		});
	} else {
		stage.addEventListener("click", () => openViewer());
	}
	show(0);
	return root;
}

/* ---------- Shared: nav, fade-up animation, footer ---------- */

function setupNav() {
	const btn = document.querySelector(".menu-btn");
	const links = document.getElementById("nav-links");
	const close = () => {
		links.classList.remove("open");
		btn.setAttribute("aria-expanded", "false");
	};
	btn.addEventListener("click", () => {
		const open = links.classList.toggle("open");
		btn.setAttribute("aria-expanded", String(open));
	});
	links.addEventListener("click", e => { if (e.target.tagName === "A") close(); });
	document.addEventListener("keydown", e => {
		if (e.key === "Escape" && links.classList.contains("open")) { close(); btn.focus(); }
	});

	// Other pages: highlight their link in the nav
	const page = document.body.dataset.page;
	if (page !== "home") {
		const a = links.querySelector(page === "experience" ? 'a[href="experience.html"]' : 'a[href="projects.html"]');
		if (a) { a.classList.add("active"); a.setAttribute("aria-current", "page"); }
		return;
	}

	// Home page: highlight the nav link for the section in view
	const navAnchors = [...links.querySelectorAll('a[href^="#"]')];
	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (!entry.isIntersecting) return;
			navAnchors.forEach(a => {
				const active = a.getAttribute("href") === "#" + entry.target.id;
				a.classList.toggle("active", active);
				if (active) a.setAttribute("aria-current", "true");
				else a.removeAttribute("aria-current");
			});
		});
	}, { rootMargin: "-45% 0px -50% 0px" });
	document.querySelectorAll("main section[id]").forEach(s => observer.observe(s));
}

function setupReveal() {
	if (!("IntersectionObserver" in window)) return;
	const groups = [
		["#about .hero > div > *"],
		["#hero-collage"],
		["main section .eyebrow", "main section h2", ".contact-lead", ".section-more"],
		[".exp-group-title", ".exp"],
		[".skill-group"],
		[".card"],
		[".value"],
		[".contact-list li"],
		[".page-header > *"],
		[".project-header > *", ".back-link"],
		[".slideshow"],
		[".project-section", ".project-pager"]
	];
	const targets = [];
	groups.forEach(selectors => {
		// stagger siblings that share a parent, capped so long lists don't lag
		const byParent = new Map();
		document.querySelectorAll(selectors.join(",")).forEach(node => {
			if (node.classList.contains("reveal")) return;
			const list = byParent.get(node.parentElement) || [];
			list.push(node);
			byParent.set(node.parentElement, list);
		});
		byParent.forEach(list => list.forEach((node, i) => {
			node.classList.add("reveal");
			node.style.setProperty("--reveal-delay", Math.min(i, 5) * 0.08 + "s");
			targets.push(node);
		}));
	});
	const io = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (!entry.isIntersecting) return;
			entry.target.classList.add("is-visible");
			io.unobserve(entry.target);
		});
	}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
	document.documentElement.classList.add("js");
	targets.forEach(t => io.observe(t));
}

/* ---------- Start ---------- */

(function init() {
	const page = document.body.dataset.page;
	if (page === "home") {
		renderAbout();
		renderCollage();
		renderExperience();
		renderSkills();
		renderProjectGrid("projects-grid", PROJECTS.slice(0, HOME_PROJECT_COUNT));
		renderValues();
		renderContact();
	} else if (page === "experience") {
		renderExperience(true);
	} else if (page === "projects") {
		renderProjectGrid("projects-grid", PROJECTS);
	} else if (page === "project") {
		renderProjectPage();
	}
	setupNav();
	setupReveal();
	document.getElementById("year").textContent = new Date().getFullYear();
})();

// Light / dark mode toggle
(function () {
	const root = document.documentElement;
	const btn = document.querySelector(".mode-btn");
	if (!btn) return;
	const render = () => {
		const dark = root.dataset.mode === "dark";
		btn.textContent = dark ? "☀︎" : "☾";
		btn.setAttribute("aria-pressed", String(dark));
		btn.title = dark ? "Switch to light mode" : "Switch to dark mode";
	};
	btn.addEventListener("click", () => {
		root.dataset.mode = root.dataset.mode === "dark" ? "light" : "dark";
		localStorage.setItem("mode", root.dataset.mode);
		render();
	});
	render();
})();
