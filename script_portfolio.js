window.addEventListener('DOMContentLoaded', () => {
    // Set initial placeholder height
    const titre = document.getElementById("TITRE");
    const placeholder = document.getElementById("title-placeholder");
    placeholder.style.height = `${titre.offsetHeight}px`;
});

window.onscroll = function() {
    const currentScrollPos = window.pageYOffset;
    const titre = document.getElementById("title-container");
    const navbar = document.getElementById("navbar");
    const navLinks = navbar.getElementsByTagName("a");
    const wrap = document.getElementById("photo_wrap");
    const photo = document.getElementById("ma-tete");
    const navbarHeight = navbar.offsetHeight;
    
    // Color transition for navbar
    const customGradient = (currentScrollPos - 70) / 1.5;
    const safeGradient = Math.min(Math.max(customGradient, 0), 255);
    navbar.style.backgroundColor = `rgb(${safeGradient/2}, ${safeGradient/2}, ${safeGradient/2})`;
    
    for (let i = 0; i < navLinks.length; i++) {
        navLinks[i].style.color = `rgb(${255 - safeGradient}, ${255 - safeGradient}, ${255 - safeGradient})`;
    }
    
    // Title position logic
    if (currentScrollPos < 70) {
        // Initial position
        titre.style.top = "80px";
        titre.style.transition = "top 0.6s ease-in-out";
        wrap.style.right = "190px";
        wrap.style.transition = "right .8s ease-in-out";
        photo.style.right = "200px";
        photo.style.transition = "right .8s ease-in-out";
    } 
    else if (currentScrollPos >= 70 && currentScrollPos < 400) {
        // Stick to navbar
        titre.style.top = `${navbarHeight-85}px`;
        titre.style.transition = "top 0.6s ease-in-out";
        wrap.style.right = "150px";
        wrap.style.transition = "right .8s ease-in-out";
        photo.style.right = "160px";
        photo.style.transition = "right .8s ease-in-out";
    } 
    else {
        // Move up
        titre.style.top = "-800px";
        titre.style.transition = "top .8s ease-in-out";
        wrap.style.right = "-420px";
        wrap.style.transition = "right .8s ease-in-out";
        photo.style.right = "-420px";
        photo.style.transition = "right .8s ease-in-out";
    }
    
    // Navbar hide/show logic
    if (currentScrollPos < prevScrollpos || currentScrollPos < 400) {
        navbar.style.top = "0";
    } else {
        navbar.style.top = "-70px";
    }
    prevScrollpos = currentScrollPos;
};

let prevScrollpos = window.pageYOffset;

// Animation d'apparition des projets
function checkProjectsVisibility() {
    const projects = document.querySelectorAll('.diagonal-project, .project-item');
    const windowHeight = window.innerHeight;
    const triggerPoint = windowHeight * 0.8; // Déclenchement quand l'élément est à 80% de la fenêtre

    projects.forEach((project, index) => {
        const projectPosition = project.getBoundingClientRect().top;
        
        if (projectPosition < triggerPoint) {
            // Délai progressif basé sur l'index pour un effet séquentiel
            setTimeout(() => {
                project.style.opacity = '1';
                project.style.transform = 'translateX(0)';
            }, index * 150); // 150ms de délai entre chaque projet
        }
    });
}

// Initialisation
window.addEventListener('DOMContentLoaded', () => {
    // Cachez initialement les projets et positionnez-les à gauche
    const projects = document.querySelectorAll('.diagonal-project, .project-item');
    projects.forEach(project => {
        project.style.opacity = '0';
        project.style.transform = 'translateX(-50px)';
        project.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    });

    // Vérifiez la visibilité au chargement et au scroll
    checkProjectsVisibility();
    window.addEventListener('scroll', checkProjectsVisibility);
});

// Gestion des onglets "À propos"
function setupAboutTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Retire la classe active de tous les boutons et contenus
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Ajoute la classe active au bouton cliqué
            button.classList.add('active');
            
            // Affiche le contenu correspondant
            const tabId = button.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
}

// Animation de la timeline
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const windowHeight = window.innerHeight;
    
    function checkTimeline() {
        timelineItems.forEach(item => {
            const itemPosition = item.getBoundingClientRect().top;
            
            if (itemPosition < windowHeight * 0.8) {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }
        });
    }
    
    // Initialisation
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        if (item.classList.contains('odd')) {
            item.style.transform = 'translateX(-50px)';
        } else {
            item.style.transform = 'translateX(50px)';
        }
    });
    
    // Vérification au chargement et au scroll
    checkTimeline();
    window.addEventListener('scroll', checkTimeline);
}

// Appel des fonctions au chargement
window.addEventListener('DOMContentLoaded', () => {
    setupAboutTabs();
    animateTimeline();
});

function setupAboutTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const dynamicImage = document.getElementById('dynamic-image');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Désactiver tous les onglets
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Activer l'onglet cliqué
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
            
            // Changer l'image
            const newImage = button.getAttribute('data-img');
            dynamicImage.style.opacity = 0;
            setTimeout(() => {
                dynamicImage.src = "images/"+newImage;
                dynamicImage.style.opacity = 1;
            }, 200);
        });
    });
}


// Contact Form Handling
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Clear previous errors
            clearErrors();
            
            // Validate form
            if (validateForm()) {
                const formData = new FormData(contactForm);
                const submitBtn = contactForm.querySelector('.submit-btn');
                const statusElement = document.getElementById('form-status');
                
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
                
                try {
                    // Replace with your actual form submission endpoint
                    const response = await fetch('https://formspree.io/f/your-form-id', {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });
                    
                    if (response.ok) {
                        showStatus('Message sent successfully!', 'success');
                        contactForm.reset();
                    } else {
                        const errorData = await response.json();
                        if (errorData.errors) {
                            showStatus('Please fix the errors below', 'error');
                            handleFormErrors(errorData.errors);
                        } else {
                            showStatus('An error occurred. Please try again later.', 'error');
                        }
                    }
                } catch (error) {
                    showStatus('Network error. Please check your connection.', 'error');
                } finally {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                }
            }
        });
    }
    
    // Real-time validation
    document.querySelectorAll('#contact-form input, #contact-form textarea').forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });
    });
});

function validateForm() {
    let isValid = true;
    const form = document.getElementById('contact-form');
    
    ['name', 'email', 'subject', 'message'].forEach(field => {
        const input = form.querySelector(`[name="${field}"]`);
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(input) {
    const errorElement = document.getElementById(`${input.name}-error`);
    let isValid = true;
    
    if (!input.value.trim()) {
        showError(input, errorElement, 'This field is required');
        isValid = false;
    } else if (input.type === 'email' && !isValidEmail(input.value)) {
        showError(input, errorElement, 'Please enter a valid email');
        isValid = false;
    } else {
        clearError(input, errorElement);
    }
    
    return isValid;
}

function showError(input, errorElement, message) {
    input.style.borderColor = '#CC0000';
    errorElement.textContent = message;
}

function clearError(input, errorElement) {
    input.style.borderColor = '#ddd';
    errorElement.textContent = '';
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
    });
    document.querySelectorAll('#contact-form input, #contact-form textarea').forEach(input => {
        input.style.borderColor = '#ddd';
    });
}

function showStatus(message, type) {
    const statusElement = document.getElementById('form-status');
    statusElement.textContent = message;
    statusElement.className = type === 'success' ? 'success-message' : 'error-message-global';
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// For Formspree errors
function handleFormErrors(errors) {
    errors.forEach(error => {
        const field = document.querySelector(`[name="${error.field}"]`);
        const errorElement = document.getElementById(`${error.field}-error`);
        if (field && errorElement) {
            showError(field, errorElement, error.message);
        }
    });
}

// Project data - you can customize this for each project
const projectsData = {
    "project1": {
        title: "Jeu de Serpent en C",
        description:  "Dans ce projet, j'ai développé un jeu de serpent en utilisant le langage C. Le jeu est basé sur la logique classique du serpent où le joueur contrôle un serpent qui grandit en mangeant des pommes. J'ai utilisé la gestion des entrées utilisateur pour créer une expérience de jeu fluide. Le jeu est entièrement configuré dans le terminal, en utilisant les caractères ascii",
        img : "images/snakke.png",
        technologies: ["C"],
        projectLink: "project1.html",
        codeLink: "https://github.com/Zelirety/snake"
    },
    "project2": {
        title: "Gestion de Tâches en Java",
        description:  "Dans ce projet, j'ai créé une application de gestion de tâches en utilisant Java et JavaFX. L'application permet aux utilisateurs de créer des membres, les ajouter à des cours, observer une liste d'adhérents, la trier, la filtrer, et bien d'autres fonctionnalités. J'ai utilisé Scene Builder pour concevoir l'interface utilisateur, ce qui m'a permis de me concentrer sur la logique métier en Java.",
        technologies: ["Java", "JavaFX","Scene Builder"],
        projectLink: "project2.html",
        codeLink: "https://github.com/Zelirety/appli-java"
    },
    "project3": {
        title: "Site Web pour les Jeux Olympiques 2024",
        description:  "Dans ce projet, j'ai développé un site web statique pour une entreprise fictive. J'ai utilisé HTML, CSS et JavaScript pour créer une interface utilisateur attrayante et interactive. Le site comprend 4 sections, une developée par chaque membre de notre groupe afin de représenter notre site imaginé des Jeux Olympiques 2024. J'ai également utilisé FIGMA pour concevoir l'interface avant de commencer le développement.",
        technologies: ["HTML", "CSS", "JavaScript", "FIGMA"],
        projectLink: "project3.html",
        codeLink: "https://github.com/Zelirety/Site_JO"
    },
    "project4": {
        title: "eploitation d'une base de données MySQL avec Docker et WSL",
        description: "Dans ce projet, j'ai mis en place un environnement de développement pour un projet PHP en utilisant Docker et WSL. J'ai créé un conteneur Docker pour exécuter un serveur web avec PHP, ce qui m'a permis de travailler efficacement sur le projet tout en isolant les dépendances. J'ai également configuré WSL pour faciliter le développement sur Windows.",
        technologies: ["sqlWorkbench"],
        projectLink: "project4.html",
        codeLink: "https://github.com/Zelirety/docker"
    },
    "project5": {
        title: "Project 5",
        description: "Dans ce projet, j'ai mis en place un environnement de développement pour un projet PHP en utilisant Docker et WSL. J'ai créé un conteneur Docker pour exécuter un serveur web avec PHP, ce qui m'a permis de travailler efficacement sur le projet tout en isolant les dépendances. J'ai également configuré WSL pour faciliter le développement sur Windows.",
        technologies: ["Bash", "DOCKER", "WSL", "PHP"],
        projectLink: "project4.html",
        codeLink: "https://github.com/Zelirety/BDD"
    },
    "project6": {
        title: "Project 6",
        description: "Detailed description of Project 4. This could be an open-source contribution or a team project. Describe your role and contributions.",
        technologies: ["Vue.js", "Firebase", "Git"],
        projectLink: "project4.html",
        codeLink: "https://github.com/Zelirety/KNN"
    },
    "project7": {
        title: "Project 7",
        description: "Detailed description of Project 4. This could be an open-source contribution or a team project. Describe your role and contributions.",
        technologies: ["Lucidchart", "Project libre"],
        projectLink: "project4.html",
        codeLink: "https://github.com/Zelirety/Conduite-de-projet"
    },
    "project8": {
        title: "Project 8",
        description: "Dans ce projet, j'ai mis en place un environnement de développement pour un projet PHP en utilisant une  machine virtuelle. J'ai configuré un serveur web avec PHP et Apache une base de données MySQL, ce qui m'a permis de travailler sur le projet dans un environnement isolé.",
        technologies: ["PHP", "Apache", "MySQL"],
        projectLink: "project4.html",
        codeLink: "https://github.com/Zelirety/Installation-r-seau"
    },
    "project9": {
        title: "Création de jeux Vidéos",
        description: "Depuis 2020, j'ai commencé à créer des jeux vidéos en utilisant Pygame. J'ai réalisé plusieurs projets, dont un jeu de type Zelda-like. Ce projet m'a permis de me familiariser avec la programmation orientée objet et la gestion des événements dans un environnement de jeu. J'ai également appris à gérer les ressources graphiques et sonores, ainsi qu'à implémenter des mécaniques de jeu complexes.",
        technologies: ["Python", "Pygame"],
        projectLink: "project4.html",
        codeLink: "https://github.com/Zelirety/Zelda-like-game"
    },
};

// Modal functionality
function setupProjectModals() {
    const modal = document.getElementById("project-modal");
    const closeBtn = document.querySelector(".close-modal");
    const projectLinks = document.querySelectorAll(".diagonal-project a, .project-item a");
    const image = document.getElementById("modal-image");
    
    // When user clicks on a project link
    projectLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            
            // Get project ID from href (e.g., "project1.html" -> "project1")
            const projectId = this.getAttribute("href").replace(".html", "");
            
            // Check if we have data for this project
            if (projectsData[projectId]) {
                const project = projectsData[projectId];
                
                // Populate modal with project data
                document.getElementById("modal-title").textContent = project.title;
                document.getElementById("modal-description").textContent = project.description;
                
                // Populate technologies
                const techList = document.getElementById("modal-tech-list");
                techList.innerHTML = "";
                project.technologies.forEach(tech => {
                    const li = document.createElement("li");
                    li.textContent = tech;
                    techList.appendChild(li);
                });
                // Set image
                image.src = project.img || "images/default.png"; // Fallback image if none provided
                
                // Set links
                const projectLink = document.getElementById("modal-project-link");
                const codeLink = document.getElementById("modal-code-link");
                
                projectLink.setAttribute("href", project.projectLink);
                codeLink.setAttribute("href", project.codeLink);
                
                // Show modal
                modal.style.display = "block";
                document.body.style.overflow = "hidden"; // Prevent scrolling
            }
        });
    });
    
    // When user clicks on close button
    closeBtn.addEventListener("click", function() {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Re-enable scrolling
    });
    
    // When user clicks anywhere outside the modal
    window.addEventListener("click", function(e) {
        if (e.target === modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });
}

// Initialize modals when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
    setupProjectModals();
});
