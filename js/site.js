/* =========================================================
	SITE CODE: shared by every page. Content lives in js/data.js;
	you shouldn't need to edit this file.
	Each page sets <body data-page="home|projects|project">.
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
	document.getElementById("about-title").textContent = PROFILE.greeting;

	const intro = document.getElementById("intro");
	PROFILE.intro.forEach(text => intro.appendChild(rich("p", text)));

	const facts = document.getElementById("facts");
	PROFILE.facts.forEach(f => facts.appendChild(el("span", { text: f })));

	document.getElementById("hero-buttons").append(
		el("a", { class: "btn btn-primary", href: PROFILE.resume, download: "", text: "Download Resume" }),
		el("a", { class: "btn btn-outline", href: "projects.html", text: "View Projects" }),
		el("a", { class: "btn btn-outline", href: PROFILE.github, target: "_blank", rel: "noopener noreferrer", text: "GitHub" })
	);
}

function renderCollage() {
	const photos = (PROFILE.photos || []).slice(0, 4);
	if (!photos.length) return;
	const collage = document.getElementById("hero-collage");
	photos.forEach((ph, i) => collage.appendChild(
		el("div", { class: "photo" }, [el("img", { src: ph.src, alt: ph.alt || "", loading: i ? "lazy" : "eager" })])
	));
	collage.hidden = false;
	collage.closest(".hero").classList.add("has-collage");
}

function renderExperience() {
	const wrap = document.getElementById("experience-list");
	EXPERIENCE.forEach(group => {
		wrap.appendChild(el("h3", { class: "exp-group-title", text: group.group }));
		wrap.appendChild(el("div", { class: "exp-list" }, group.entries.map(e =>
			el("article", { class: "exp" }, [
				el("div", { class: "exp-head" }, [
					el("h3", { text: e.org }),
					el("span", { class: "meta", text: e.location + " · " + e.dates })
				]),
				el("p", { class: "role", text: e.role }),
				el("ul", { class: "points" }, e.points.map(p => rich("li", p)))
			])
		)));
	});
}

function renderSkills() {
	const grid = document.getElementById("skills-grid");
	SKILLS.forEach(g => grid.appendChild(
		el("div", { class: "skill-group" }, [el("h3", { text: g.category }), tagList(g.items)])
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
			el("img", { src: cover.src, alt: "", loading: "lazy" })
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
	const gallery = photos.length ? el("div", { class: "gallery gallery-" + Math.min(photos.length, 4) }, photos.map(ph =>
		el("figure", {}, [
			el("img", { src: ph.src, alt: ph.alt || "", loading: "lazy" }),
			ph.caption ? el("figcaption", { text: ph.caption }) : null
		])
	)) : null;

	const about = p.about || [];
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
		gallery || "",
		el("div", { class: "project-body" }, [
			about.length ? el("section", { class: "project-section" }, [
				el("h2", { text: "Overview" }),
				...about.map(t => rich("p", t))
			]) : null,
			el("section", { class: "project-section" }, [
				el("h2", { text: "What I did" }),
				el("ul", { class: "points" }, p.points.map(pt => rich("li", pt)))
			])
		]),
		el("nav", { class: "project-pager", "aria-label": "More projects" }, [
			el("a", { class: "pager-prev", href: projectUrl(prev) }, [el("span", { text: "Previous" }), el("strong", { text: prev.title })]),
			el("a", { class: "pager-next", href: projectUrl(next) }, [el("span", { text: "Next" }), el("strong", { text: next.title })])
		])
	);
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

	// Projects pages: highlight "Projects" in the nav
	const page = document.body.dataset.page;
	if (page !== "home") {
		const a = links.querySelector('a[href="projects.html"]');
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
		[".gallery figure"],
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
	} else if (page === "projects") {
		renderProjectGrid("projects-grid", PROJECTS);
	} else if (page === "project") {
		renderProjectPage();
	}
	setupNav();
	setupReveal();
	document.getElementById("year").textContent = new Date().getFullYear();
})();
