document.addEventListener('DOMContentLoaded', () => {
    const todoData = {
        title: "Complete HNG Stage 0 Task",
        description: "Finish the frontend implementation of the todo card with all required test attributes and accessibility features.",
        priority: "high",
        status: "pending",
        dueDate: new Date('2026-04-16T23:59:00Z')
    };

    let draftData = null;

    const todoCard = document.querySelector('[data-testid="test-todo-card"]');
    const displayView = document.getElementById('todo-display-view');
    const editView = document.getElementById('todo-edit-view');
    const titleEl = document.querySelector('[data-testid="test-todo-title"]');
    const descriptionEl = document.querySelector('[data-testid="test-todo-description"]');
    const priorityBadge = document.querySelector('[data-testid="test-todo-priority"]');
    const statusBadge = document.querySelector('[data-testid="test-todo-status"]');
    const statusControl = document.querySelector('[data-testid="test-todo-status-control"]');
    const completeToggle = document.querySelector('[data-testid="test-todo-complete-toggle"]');
    const dueDateEl = document.querySelector('[data-testid="test-todo-due-date"]');
    const timeRemainingEl = document.querySelector('[data-testid="test-todo-time-remaining"]');
    const overdueWrapper = document.querySelector('.overdue-wrapper');

    const editTitleInput = document.querySelector('[data-testid="test-todo-edit-title-input"]');
    const editDescInput = document.querySelector('[data-testid="test-todo-edit-description-input"]');
    const editPrioritySelect = document.querySelector('[data-testid="test-todo-edit-priority-select"]');
    const editDueDateInput = document.querySelector('[data-testid="test-todo-edit-due-date-input"]');
    
    const editBtn = document.querySelector('[data-testid="test-todo-edit-button"]');
    const cancelBtn = document.querySelector('[data-testid="test-todo-cancel-button"]');
    const saveBtn = document.querySelector('[data-testid="test-todo-save-button"]');
    const expandToggle = document.querySelector('[data-testid="test-todo-expand-toggle"]');
    const collapsibleSection = document.querySelector('[data-testid="test-todo-collapsible-section"]');

    function updateUI() {
        titleEl.textContent = todoData.title;
        descriptionEl.textContent = todoData.description;
        
        priorityBadge.textContent = todoData.priority.charAt(0).toUpperCase() + todoData.priority.slice(1);
        todoCard.classList.remove('priority-low', 'priority-medium', 'priority-high');
        todoCard.classList.add(`priority-${todoData.priority}`);

        statusControl.value = todoData.status;
        statusBadge.textContent = todoData.status.charAt(0).toUpperCase() + todoData.status.slice(1).replace('-', ' ');
        
        completeToggle.checked = (todoData.status === 'done');

        todoCard.classList.toggle('completed', todoData.status === 'done');
        todoCard.classList.toggle('status-in-progress', todoData.status === 'in-progress');

        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        dueDateEl.textContent = `Due ${todoData.dueDate.toLocaleDateString(undefined, options)}`;
        dueDateEl.setAttribute('datetime', todoData.dueDate.toISOString());

        updateTimeRemaining();
    }

    function updateTimeRemaining() {
        if (todoData.status === 'done') {
            timeRemainingEl.textContent = "Completed";
            overdueWrapper.classList.remove('overdue');
            return;
        }

        const now = new Date();
        const diff = todoData.dueDate - now;

        let timeStr = "";
        const isOverdue = diff <= 0;

        if (isOverdue) {
            const absDiff = Math.abs(diff);
            const hours = Math.floor(absDiff / (1000 * 60 * 60));
            const minutes = Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60));
            
            if (hours > 0) {
                timeStr = `Overdue by ${hours}h ${minutes}m`;
            } else {
                timeStr = `Overdue by ${minutes}m`;
            }
            overdueWrapper.classList.add('overdue');
        } else {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

            if (days > 1) {
                timeStr = `Due in ${days} days`;
            } else if (days === 1) {
                timeStr = "Due tomorrow";
            } else if (hours > 0) {
                timeStr = `Due in ${hours}h ${minutes}m`;
            } else {
                timeStr = `Due in ${minutes}m`;
            }
            overdueWrapper.classList.remove('overdue');
        }

        timeRemainingEl.textContent = timeStr;
    }

    statusControl.addEventListener('change', (e) => {
        todoData.status = e.target.value;
        updateUI();
    });

    completeToggle.addEventListener('change', (e) => {
        todoData.status = e.target.checked ? 'done' : 'pending';
        updateUI();
    });

    editBtn.addEventListener('click', () => {
        draftData = { ...todoData };

        editTitleInput.value = draftData.title;
        editDescInput.value = draftData.description;
        editPrioritySelect.value = draftData.priority;
        
        const d = draftData.dueDate;
        const offset = d.getTimezoneOffset() * 60000;
        const localISOTime = (new Date(d - offset)).toISOString().slice(0, 16);
        editDueDateInput.value = localISOTime;

        displayView.classList.add('hidden');
        editView.classList.remove('hidden');
        editTitleInput.focus();
    });

    cancelBtn.addEventListener('click', () => {
        editView.classList.add('hidden');
        displayView.classList.remove('hidden');
        draftData = null;
    });

    editView.addEventListener('submit', (e) => {
        e.preventDefault();
        
        todoData.title = editTitleInput.value;
        todoData.description = editDescInput.value;
        todoData.priority = editPrioritySelect.value;
        todoData.dueDate = new Date(editDueDateInput.value);

        editView.classList.add('hidden');
        displayView.classList.remove('hidden');
        updateUI();
    });

    expandToggle.addEventListener('click', () => {
        const isExpanded = expandToggle.getAttribute('aria-expanded') === 'true';
        expandToggle.setAttribute('aria-expanded', !isExpanded);
        collapsibleSection.classList.toggle('expanded', !isExpanded);
    });

    expandToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            expandToggle.click();
        }
    });

    updateUI();
    setInterval(updateTimeRemaining, 30000);
});
