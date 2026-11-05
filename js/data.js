/* =========================================================
	CONTENT DATA: edit this file to update every page of the site.
	To add a project, copy one object in PROJECTS and edit it.
	Set a link to "" to hide its button.
	Wrap words in **double asterisks** to bold them.
========================================================= */

const PROFILE = {
	name: "Natasha Mykytiuk",
	greeting: "Hi, I'm Natasha 👋",
	// Intro paragraphs. Wrap words in **double asterisks** to highlight them.
	intro: [
		"I'm a **Computer Engineering** student at the **University of British Columbia**, graduating in May 2029.",
		"Right now I write embedded C firmware for **UBC Solar Racing**, working on the driver display that shows live telemetry during races. I'm also building **Welicare**, a tablet app that helps caregivers support people living with dementia.",
		"I like work that sits between hardware and software, and I'm looking for a **Summer 2027 co-op** in software, firmware, or hardware engineering."
	],
	facts: ["Vancouver, BC", "Open to relocation", "Co-op: 4, 8, 12, or 16 months"],
	// Photo collage beside the intro: up to 4 photos (1 = tall left, 2 = short right,
	// 3 = tall right, 4 = short left). Put files in an img/ folder next to index.html.
	// Leave the list empty to hide the collage.
	photos: [
		// { src: "img/photo-1.jpg", alt: "Describe the photo" },
	],
	email: "natasha.mykytiuk@gmail.com",
	linkedin: "https://www.linkedin.com/in/natashamykytiuk",
	github: "https://github.com/natashamykytiuk-bit",
	resume: "resume.pdf"
};

// "How I work": short principles. Edit or remove freely (empty list hides the section).
const VALUES = [
	{ title: "Reliable", text: "Firmware that holds up mid-race." },
	{ title: "Accessible", text: "Built for the people who use it." },
	{ title: "Clear", text: "Simple designs that are easy to check." },
	{ title: "Curious", text: "Hardware, software, and everything in between." }
];

const SKILLS = [
	{ category: "Programming Languages", items: ["Python", "Java", "JavaScript", "C/C++", "SystemVerilog", "MATLAB"] },
	{ category: "Software & Backend Development", items: ["React Native", "Firestore", "Firebase", "Cloud Functions", "LLM Integration", "Systems Design", "Backend Architecture", "Accessibility-Focused UI Design"] },
	{ category: "Embedded Systems & Controls", items: ["Arduino", "FPGA (Intel MAX 10)", "FreeRTOS", "CAN", "Servo Control", "Sensor Calibration", "Closed-Loop Control"] },
	{ category: "Engineering & Project Software", items: ["Aconex", "Bluebeam", "SOLIDWORKS", "Intel Quartus Prime", "MS Office Suite", "SharePoint"] },
	{ category: "Tools", items: ["Git", "GitHub", "Claude Code", "Figma", "Photoshop"] }
];

const EXPERIENCE = [
	{
		group: "Engineering Design Teams",
		entries: [
			{
				org: "UBC Solar Racing",
				logo: "img/logos/ubc-solar.png",
				role: "Embedded Firmware Developer",
				location: "Vancouver, BC",
				dates: "Sep. 2026 – Present",
				points: [
					"Leading the **LCD display update** for the driver board (DRD), writing **C firmware** on **FreeRTOS** for an **STM32F103** that shows live telemetry data to the driver during races.",
					"Built **DRD health monitoring** that tracks fault flags and reports status over CAN to catch board failures.",
					"Decoded **CAN** messages from the telemetry system and updated the display in real time, splitting the work into separate FreeRTOS tasks for CAN input, health checks, and screen drawing.",
					"Fixed a **push-to-talk (PTT)** bug in the DRD firmware and updated pin mappings to match **Altium** schematic revision v2.1, working with the electrical team to check the changes on hardware."
				]
			}
		]
	},
	{
		group: "Work Experience",
		entries: [
			{
				org: "Rangeland Engineering",
				logo: "img/logos/rangeland.png",
				role: "Engineering Intern",
				location: "Calgary, AB",
				dates: "May 2026 – Aug. 2026",
				points: [
					"Provided **project coordination** and **document control** across major industrial and infrastructure projects, including CNRL Horizon and the Trans Mountain Expansion Project.",
					"Performed quality checks on engineering drawings and technical documents using **Bluebeam** and **Aconex** prior to client transmittal.",
					"Tracked client comments and deliverable revisions, supporting timely turnaround and clear audit trails throughout review cycles."
				]
			}
		]
	}
];

// How many projects (from the top of the list) appear on the home page.
const HOME_PROJECT_COUNT = 3;

/* PROJECTS
	slug:    the project's page address: project.html?p=<slug> (lowercase, no spaces)
	photos:  the first photo is the card cover; all of them show on the project page.
	         e.g. { src: "img/welicare/home.jpg", alt: "Home screen", caption: "Optional caption" }
	         Leave empty for a text-only card and no gallery.
	about:   optional longer paragraphs shown only on the project page, above the bullets.
	points:  the "What I did" bullets on the project page. */
const PROJECTS = [
	{
		title: "Welicare: Dementia Care Mobile App",
		slug: "welicare",
		photos: [
			{ src: "img/welicare/resident-home.png", alt: "Welicare resident home screen with a personalized greeting and large activity tiles", caption: "Resident Mode home: a personalized greeting and large, high-contrast activity tiles." },
			{ src: "img/welicare/app-home.png", alt: "Welicare mode picker showing Resident, Family, Caregiver, Volunteer and Admin modes", caption: "Role-based modes for residents, family, caregivers, volunteers and admins." },
			{ src: "img/welicare/caregiver-stats.png", alt: "Caregiver dashboard showing time and visits per activity", caption: "Caregiver stats: time and visits per activity across the organization." },
			{ src: "img/welicare/memory-match.png", alt: "Memory Match card game at medium difficulty", caption: "Memory Match, one of the resident games, at medium difficulty." },
			{ src: "img/welicare/photo-album.png", alt: "Adding photos to a resident's shared photo album", caption: "Caregivers and family add photos to a resident's shared album." }
		],
		about: [],
		summary: "A React Native tablet app with a Firebase backend and AI-personalized activities, helping caregivers support people living with dementia.",
		subtitle: "Full-Stack Development, LLM Integration",
		tags: ["React Native", "Firebase", "Firestore", "Cloud Functions", "LLM Integration", "Figma"],
		points: [
			"Developing a **React Native** tablet app that helps caregivers provide personalized care for individuals living with dementia.",
			"Architecting a **Firebase** backend using Authentication, **Firestore**, and **Cloud Functions** with role-based access across shared care organizations.",
			"Developing an AI system for personalized activities, trivia, conversation prompts, and media recommendations with an accessibility-focused mobile interface.",
			"Using **Claude Code** to support development, debugging, and testing, with version control through **Git** and **GitHub**.",
			"Applying accessible design principles (high contrast, large touch targets, legible typography) using **Photoshop** and **Figma**."
		],
		github: "https://github.com/natashamykytiuk-bit/Welicare",
		demo: "https://welicare.ca",
		demoLabel: "Learn more about what Welicare does"
	},
	{
		title: "Digital Combination Lock",
		slug: "digital-combination-lock",
		photos: [
			{ src: "img/combination-lock/board-open.jpg", alt: "DE10-Lite FPGA board with the seven-segment displays reading OPEn after the correct combination is entered", caption: "Correct combination entered: the seven-segment displays read \"OPEn\"." }
		],
		about: [],
		summary: "A 4-state Moore FSM combination lock on a DE10-Lite board, with next-state logic derived by hand from Karnaugh maps.",
		subtitle: "Digital Logic Design, FSM Design",
		tags: ["SystemVerilog", "FPGA", "Intel MAX 10", "Intel Quartus Prime"],
		points: [
			"Designed a 4-state **Moore FSM** in **SystemVerilog** to control a 10-bit combination lock on an **Intel MAX 10 FPGA**, registering exactly one state change per button press.",
			"Derived the next-state and output logic by hand using **Karnaugh maps**, then verified it on hardware against a synthesized case-statement version.",
			"Built a datapath to store and compare the code and guess, count wrong bits for a **hint display**, and show results on seven-segment displays.",
			"Synthesized and tested the design in **Quartus** on a **DE10-Lite** board, using LEDs to display the current FSM state."
		],
		github: "",	// no public repo
		demo: "",
		demoLabel: "Demo"
	},
	{
		title: "Tally: To-Do Application",
		slug: "tally",
		photos: [
			{ src: "img/tally/my-day.png", alt: "Tally My Day view with lists in the sidebar and tasks showing progress, steps and due dates", caption: "My Day: today's tasks with progress, steps, lists and due dates." },
			{ src: "img/tally/task-details.png", alt: "Tally task details panel with list, due date and the days to work on it", caption: "Task details: pick the days to work on a task, separate from when it's due." }
		],
		about: [],
		summary: "A cross-platform to-do and habit tracker built with React Native, Expo and Firebase, designed around planning which days to work on tasks.",
		subtitle: "Full-Stack Mobile & Web Development",
		tags: ["React Native", "Expo", "TypeScript", "Firebase", "Firestore", "Jest"],
		points: [
			"Developed a cross-platform **React Native** (**Expo**, **TypeScript**) to-do and habit tracker for iOS, Android and web that helps users plan when to work on tasks, not just when they are due.",
			"Built a **Cloud Firestore** backend with **Firebase Authentication** to store each user's lists, tasks, completions and step progress, locked to its owner by Firestore security rules.",
			"Implemented recurring tasks with streaks and missed-day carry-over using **date-fns**, computing each day's occurrences from repeat rules instead of storing a copy per day.",
			"Managed version control through **Git** and **GitHub**, deploying with **Firebase Hosting** and testing scheduling, streak and view logic with **Jest**."
		],
		github: "https://github.com/natashamykytiuk-bit/tally-to-do",
		demo: "https://tally-to-do.web.app",
		demoLabel: "Demo"
	},
	{
		title: "Spottr: Gym Traffic Web App",
		slug: "spottr",
		photos: [],
		about: [],
		summary: "A team web app showing live gym traffic at UBC Rec North, with a Java REST backend on AWS and a TypeScript frontend.",
		subtitle: "Full-Stack Web Development, Cloud Deployment",
		tags: ["Java", "TypeScript", "REST API", "MVC", "AWS"],
		points: [
			"Developing a team web application that shows live gym traffic at UBC Rec North, helping students choose when to work out and which machines are free.",
			"Architecting a **Java** backend and **TypeScript** frontend using a **client–server MVC** design, with a **REST API** for authentication, check-ins, and workouts.",
			"Building an occupancy system that estimates how busy the gym is from active check-ins, automatically checking users out after their planned workout and filtering by muscle group or machine.",
			"Deploying the backend on **AWS** to serve live occupancy data to the web client, with version control through **Git** and **GitHub**."
		],
		github: "https://github.com/natashamykytiuk-bit/spottr",
		demo: "",	// add the live URL once it's deployed
		demoLabel: "Live Site"
	},
	{
		title: "FPGA Keypad Scanner",
		slug: "fpga-keypad-scanner",
		photos: [],
		about: [],
		summary: "A SystemVerilog keypad scanner on an Intel MAX 10 FPGA that sends one clean key code per press to a second board, closing timing at 50 MHz.",
		subtitle: "Digital Design, Clock Domain Crossing",
		tags: ["SystemVerilog", "FPGA", "Intel MAX 10", "Intel Quartus Prime"],
		points: [
			"Designed a **SystemVerilog FSM** to scan a 4×4 matrix keypad on an **Intel MAX 10 FPGA**, outputting exactly one key code per press despite contact bounce.",
			"Integrated two-flop **synchronizers** and a **debounce** counter so held keys and switch bounce never register as extra presses.",
			"Built a **handshake interface** to send key codes to a second FPGA on a separate clock, holding data stable for the whole press so the receiver can sample it safely.",
			"Wrote an **SDC** clock constraint and **closed timing at 50 MHz** with 16 ns of setup slack, and verified the design with a self-checking testbench that models key bounce."
		],
		github: "",	// no public repo
		demo: "",
		demoLabel: "Demo"
	},
	{
		title: "Autonomous Robotic Claw",
		slug: "autonomous-robotic-claw",
		photos: [],
		about: [],
		summary: "An Arduino-controlled claw that grips, checks the lift with ultrasonic sensing, and retries on its own.",
		subtitle: "Embedded Systems, Sensor Integration",
		tags: ["C/C++", "Arduino", "Closed-Loop Control", "Servo Control", "Sensor Calibration"],
		points: [
			"Implemented a four-state control system in **C/C++** on **Arduino** to automate grip, lift verification, and retry sequences using ultrasonic sensing and servo actuation.",
			"Wired and calibrated the ultrasonic sensor, servo, and Arduino, tuning thresholds for reliable detection within ±2 mm assembly tolerances.",
			"Eliminated false triggering near threshold boundaries through closed-loop lift verification, resulting in stable state transitions."
		],
		github: "#",	// TODO
		demo: "",
		demoLabel: "Demo"
	}
];
