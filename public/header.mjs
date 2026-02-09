function getPageTitle() {
    return "Uriel Hernandez";
}

function navItems() {
    return [
        { href: "index.html", label: "Main" },
        { href: "hobbies.html", label: "Hobbies" },
    ];
}

function createHeader() {
    const header = document.createElement("header");

    const nav = document.createElement("nav");
    nav.className = "navbar";
    header.append(nav);

    // Left side
    const left = document.createElement("div");
    left.className = "nav-left";
    nav.append(left);

    const h1 = document.createElement("h1");
    h1.textContent = getPageTitle();
    left.append(h1);

    const links = document.createElement("ul");
    links.className = "nav-links";
    links.id = "nav-links";
    left.append(links);

    for (const item of navItems()) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = item.href;
        a.textContent = item.label;
        li.append(a);
        links.append(li);
    }

    // Right side
    const right = document.createElement("div");
    right.className = "nav-right";
    nav.append(right);


    const label = document.createElement("label");
    label.className = "darkmode-label";
    label.innerHTML = `
    <input id="darkmode-toggle" type="checkbox" autocomplete="off" />
    Dark mode
  `;
    right.append(label);

    const menuBtn = document.createElement("button");
    menuBtn.className = "menu-btn";
    menuBtn.type = "button";
    menuBtn.setAttribute("aria-controls", "nav-links");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.textContent = "Menu";
    right.append(menuBtn);

    //  mobile
    function openMenu() {
        links.classList.add("is-open");
        menuBtn.setAttribute("aria-expanded", "true");
    }

    function closeMenu() {
        links.classList.remove("is-open");
        menuBtn.setAttribute("aria-expanded", "false");
    }

    function toggleMenu() {
        const isOpen = links.classList.toggle("is-open");
        menuBtn.setAttribute("aria-expanded", String(isOpen));
    }

    menuBtn.addEventListener("click", toggleMenu);

    document.body.addEventListener("click", (e) => {
        const clickedInsideHeader = header.contains(e.target);
        if (!clickedInsideHeader) closeMenu();
    });



    // dark-mode
    const toggle = label.querySelector("#darkmode-toggle");
    const STORAGE_KEY = "darkMode";

    function applyDarkMode(isOn) {
        document.body.classList.toggle("dark-mode", isOn);
        toggle.checked = isOn;
    }

    const saved = localStorage.getItem(STORAGE_KEY); // "on" | "off" | null
    applyDarkMode(saved === "on");

    // update body,  save
    toggle.addEventListener("change", () => {
        const isOn = toggle.checked;
        document.body.classList.toggle("dark-mode", isOn);
        localStorage.setItem(STORAGE_KEY, isOn ? "on" : "off");
    });

    return header;
}

const mount = document.getElementById("site-header");
if (mount) {
    mount.append(createHeader());
} else {
    console.warn('Missing <div id="site-header"></div> mount point.');
}
