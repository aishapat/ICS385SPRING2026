// app.js
// Course Catalog Manager for Week 8a - ICS385
// Handles loading, displaying, searching, filtering, and exporting course data

class CourseCatalogManager {
    constructor() {
        this.courseCatalog = null; // full JSON data
        this.filteredCourses = []; // courses after search/filter
        this.searchCache = new Map(); // cache for fast searches
        this.initializeApp();
    }

    // Initialize the app
    initializeApp() {
        try {
            this.loadSampleData(); // load default JSON
            this.displayAllCourses(); // show courses on page
            this.setupEventListeners(); // for search/filter
        } catch (error) {
            this.handleError("App initialization failed", error);
        }
    }

    // Load sample JSON data
    async loadSampleData() {
        try {
            const response = await fetch('sample-data.json'); // your JSON file
            const data = await response.json();
            this.validateCatalogStructure(data);
            this.courseCatalog = data;
            this.filteredCourses = this.getAllCourses();
            console.log("Sample data loaded");
        } catch (error) {
            this.handleError("Failed to load JSON data", error);
        }
    }

    // Validate the main structure of the JSON
    validateCatalogStructure(data) {
        const required = ["university", "semester", "departments"];
        const missing = required.filter(field => !data.hasOwnProperty(field));
        if (missing.length > 0) throw new Error("Missing fields: " + missing.join(", "));
        if (!Array.isArray(data.departments) || data.departments.length === 0) 
            throw new Error("Departments array must exist and have at least one department");
    }

    // Get all courses across departments
    getAllCourses() {
        if (!this.courseCatalog) return [];
        const all = [];
        this.courseCatalog.departments.forEach(dept => {
            dept.courses.forEach(course => {
                all.push({
                    ...course,
                    departmentCode: dept.code,
                    departmentName: dept.name
                });
            });
        });
        return all;
    }

    // Display all courses in the container
    displayAllCourses() {
        const container = document.getElementById("coursesContainer");
        if (!container) return;

        container.innerHTML = ""; // clear old cards

        if (this.filteredCourses.length === 0) {
            container.innerHTML = "<p>No courses found</p>";
            return;
        }

        this.filteredCourses.forEach(course => {
            const card = this.createCourseCard(course);
            container.appendChild(card);
        });
    }

    // Create a single course card element
    createCourseCard(course) {
        const card = document.createElement("div");
        card.className = "course-card";

        const enrollmentPercent = Math.round((course.schedule.enrolled / course.schedule.capacity) * 100);
        const status = enrollmentPercent >= 90 ? "full" : enrollmentPercent >= 70 ? "filling" : "open";

        card.innerHTML = `
            <h3>${course.courseCode} - ${course.title}</h3>
            <p>${course.description}</p>
            <p><strong>Instructor:</strong> ${course.instructor.name}</p>
            <p><strong>Schedule:</strong> ${course.schedule.days.join(", ")} ${course.schedule.time}</p>
            <p class="${status}">Enrolled: ${course.schedule.enrolled}/${course.schedule.capacity} (${enrollmentPercent}%)</p>
            <button onclick="app.showCourseDetails('${course.courseCode}')">View Details</button>
        `;
        return card;
    }

    // Search courses by multiple fields
    searchCourses(query) {
        if (!query || query.trim() === "") {
            this.filteredCourses = this.getAllCourses();
            this.displayAllCourses();
            return;
        }

        const term = query.toLowerCase().trim();
        if (this.searchCache.has(term)) {
            this.filteredCourses = this.searchCache.get(term);
            this.displayAllCourses();
            return;
        }

        const results = this.getAllCourses().filter(course => {
            return course.courseCode.toLowerCase().includes(term) ||
                   course.title.toLowerCase().includes(term) ||
                   course.instructor.name.toLowerCase().includes(term) ||
                   course.topics.some(topic => topic.toLowerCase().includes(term));
        });

        this.searchCache.set(term, results);
        this.filteredCourses = results;
        this.displayAllCourses();
    }

    // Show course details (placeholder)
    showCourseDetails(courseCode) {
        const course = this.getAllCourses().find(c => c.courseCode === courseCode);
        if (!course) return alert("Course not found");
        alert(`Details for ${course.courseCode}:\nInstructor: ${course.instructor.name}\nTopics: ${course.topics.join(", ")}`);
    }

    // Handle errors in app
    handleError(message, error) {
        console.error(message, error);
        alert(`${message}: ${error.message}`);
    }

    // Set up search input event
    setupEventListeners() {
        const searchInput = document.getElementById("searchInput");
        if (!searchInput) return;
        searchInput.addEventListener("input", e => {
            this.searchCourses(e.target.value);
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    window.app = new CourseCatalogManager();
});