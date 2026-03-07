// CourseCatalogManager handles loading, displaying, searching, and filtering courses
class CourseCatalogManager {
    constructor() {
      this.courseCatalog = null;       // Will hold all course data
      this.filteredCourses = [];       // Courses after search/filter
      this.searchCache = new Map();    // Cache to make searches faster
      this.initializeApp();
    }
  
    // Initialize app after page loads
    initializeApp() {
      try {
        this.loadSampleData();
        this.displayAllCourses();
      } catch (error) {
        console.error('App initialization error:', error);
        alert('Failed to start app. Check console.');
      }
    }
  
    // Load JSON data from sample-data.json
    async loadSampleData() {
      try {
        const response = await fetch('sample-data.json');
        const data = await response.json();
        this.validateCatalogStructure(data);
        this.courseCatalog = data;
        this.filteredCourses = this.getAllCourses();
        console.log('Course catalog loaded successfully');
      } catch (error) {
        console.error('Error loading JSON:', error);
        alert('Failed to load course data.');
      }
    }
  
    // Ensure JSON has required fields
    validateCatalogStructure(data) {
      const required = ['university', 'semester', 'departments'];
      const missing = required.filter(field => !data.hasOwnProperty(field));
      if (missing.length > 0) {
        throw new Error('Missing required fields: ' + missing.join(', '));
      }
      if (!Array.isArray(data.departments) || data.departments.length === 0) {
        throw new Error('Departments array is required');
      }
    }
  
    // Get all courses in one array
    getAllCourses() {
      if (!this.courseCatalog) return [];
      const allCourses = [];
      this.courseCatalog.departments.forEach(dept => {
        dept.courses.forEach(course => {
          allCourses.push({
            ...course,
            departmentCode: dept.code,
            departmentName: dept.name
          });
        });
      });
      return allCourses;
    }
  
    // Search courses by code, title, instructor, or topics
    searchCourses(query) {
      if (!query || query.trim() === '') {
        this.filteredCourses = this.getAllCourses();
        this.displayAllCourses();
        return;
      }
  
      const searchTerm = query.toLowerCase().trim();
      if (this.searchCache.has(searchTerm)) {
        this.filteredCourses = this.searchCache.get(searchTerm);
        this.displayAllCourses();
        return;
      }
  
      const results = this.getAllCourses().filter(course => {
        return course.courseCode.toLowerCase().includes(searchTerm) ||
               course.title.toLowerCase().includes(searchTerm) ||
               course.instructor.name.toLowerCase().includes(searchTerm) ||
               course.topics.some(topic => topic.toLowerCase().includes(searchTerm)) ||
               course.departmentName.toLowerCase().includes(searchTerm);
      });
  
      this.searchCache.set(searchTerm, results);
      this.filteredCourses = results;
      this.displayAllCourses();
    }
  
    // Create HTML for each course card
    createCourseCard(course) {
      const cardDiv = document.createElement('div');
      cardDiv.className = 'course-card';
      cardDiv.dataset.courseCode = course.courseCode;
  
      const enrollmentPercent = Math.round((course.schedule.enrolled / course.schedule.capacity) * 100);
      const enrollmentStatus = enrollmentPercent >= 90 ? 'full' :
                               enrollmentPercent >= 70 ? 'filling' : 'open';
  
      cardDiv.innerHTML = `
        <div class="course-header">
          <h3 class="course-code">${course.courseCode}</h3>
          <span class="credits">${course.credits} credits</span>
        </div>
        <h4 class="course-title">${course.title}</h4>
        <p class="course-description">${course.description}</p>
        <div class="instructor-info"><strong>Instructor:</strong> ${course.instructor.name}</div>
        <div class="schedule-info"><strong>Schedule:</strong> ${course.schedule.days.join(', ')} ${course.schedule.time}</div>
        <div class="enrollment-info ${enrollmentStatus}">Enrolled: ${course.schedule.enrolled}/${course.schedule.capacity} (${enrollmentPercent}%)</div>
        <div class="topics">${course.topics.map(t => `<span class="topic-tag">${t}</span>`).join('')}</div>
      `;
  
      return cardDiv;
    }
  
    // Display all filtered courses
    displayAllCourses() {
      const container = document.getElementById('coursesContainer');
      if (!container) return;
      container.innerHTML = '';
  
      if (this.filteredCourses.length === 0) {
        container.innerHTML = '<div class="no-results">No courses found.</div>';
        return;
      }
  
      this.filteredCourses.forEach(course => {
        const card = this.createCourseCard(course);
        container.appendChild(card);
      });
    }
  }
  
  // Run app when page loads
  document.addEventListener('DOMContentLoaded', () => {
    window.app = new CourseCatalogManager();
  
    // Attach search input
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
      app.searchCourses(e.target.value);
    });
  });