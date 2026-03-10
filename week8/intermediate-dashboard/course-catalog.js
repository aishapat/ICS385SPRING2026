// course-catalog.js - loads and displays course info from sample-data.json

class CourseCatalog {
    constructor() {
      this.courses = []; // all courses
      this.departments = []; // all departments
      this.filteredCourses = []; // courses after search/filter
    }
  
    // load courses from the local JSON file
    async loadCourses() {
      try {
        const response = await fetch('sample-data.json');
        if (!response.ok) throw new Error('Failed to load course data');
        const data = await response.json();
  
        // flatten all department courses into one array
        this.departments = data.departments;
        this.courses = data.departments.flatMap(dept =>
          dept.courses.map(course => ({ ...course, department: dept.name, departmentId: dept.id }))
        );
        this.filteredCourses = [...this.courses];
        this.populateDepartmentFilter();
        return this.courses;
      } catch (error) {
        console.error('Course catalog load failed:', error);
        return [];
      }
    }
  
    // add department options to the dropdown
    populateDepartmentFilter() {
      const select = document.getElementById('departmentFilter');
      if (!select) return;
      this.departments.forEach(dept => {
        const option = document.createElement('option');
        option.value = dept.id;
        option.textContent = dept.name;
        select.appendChild(option);
      });
    }
  
    // filter courses based on search input and department dropdown
    filterCourses(searchTerm = '', department = 'all') {
      this.filteredCourses = this.courses.filter(course => {
        const matchesSearch = !searchTerm ||
          course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDept = department === 'all' || course.departmentId === department;
        return matchesSearch && matchesDept;
      });
      this.renderCourses();
    }
  
    // display course cards on the page
    renderCourses() {
      const container = document.getElementById('coursesContainer');
      if (!container) return;
  
      if (this.filteredCourses.length === 0) {
        container.innerHTML = '<div class="no-results">No courses found.</div>';
        return;
      }
  
      container.innerHTML = this.filteredCourses.map(course => {
        // calculate how full the class is
        const capacityPercent = Math.round((course.enrolled / course.capacity) * 100);
        const capacityClass = capacityPercent >= 90 ? 'high' : capacityPercent >= 70 ? 'medium' : 'low';
        return `
          <div class="course-card">
            <div class="course-header">
              <span class="course-code">${course.code}</span>
              <span class="capacity-badge ${capacityClass}">${capacityPercent}% full</span>
            </div>
            <h4 class="course-name">${course.name}</h4>
            <p class="course-instructor">👤 ${course.instructor}</p>
            <p class="course-schedule">🕐 ${course.schedule}</p>
            <p class="course-enrollment">👥 ${course.enrolled}/${course.capacity} students</p>
            <div class="capacity-bar">
              <div class="capacity-fill ${capacityClass}" style="width:${capacityPercent}%"></div>
            </div>
            <p class="course-dept">${course.department}</p>
          </div>
        `;
      }).join('');
    }
  
    // add up all student enrollment numbers
    getTotalEnrollment() {
      return this.courses.reduce((sum, c) => sum + c.enrolled, 0);
    }
  
    // get the average capacity percentage across all courses
    getAverageCapacity() {
      if (this.courses.length === 0) return 0;
      const avg = this.courses.reduce((sum, c) => sum + (c.enrolled / c.capacity) * 100, 0) / this.courses.length;
      return Math.round(avg);
    }
  
    // export all course data as a downloadable JSON file
    exportData() {
      const exportData = {
        exportDate: new Date().toISOString(),
        totalCourses: this.courses.length,
        totalEnrollment: this.getTotalEnrollment(),
        courses: this.courses
      };
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'campus-courses.json';
      a.click();
      URL.revokeObjectURL(url);
    }
  }