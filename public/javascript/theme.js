document.addEventListener('DOMContentLoaded', () => {
      const toggleSwitch = document.getElementById('dark-mode-switch');
       const currentTheme = localStorage.getItem('theme');
        
        // Check for saved theme preference in localStorage
       if (currentTheme === 'dark') {
          document.body.classList.add('dark-mode');
           toggleSwitch.checked = true;
      }

       toggleSwitch.addEventListener('change', function () {
          if (this.checked) {
              document.body.classList.add('dark-mode');
               localStorage.setItem('theme', 'dark');
          } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
          }
      });
});
