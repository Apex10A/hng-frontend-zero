document.addEventListener('DOMContentLoaded', () => {
    const todoCard = document.querySelector('[data-testid="test-todo-card"]');
    const completeToggle = document.querySelector('[data-testid="test-todo-complete-toggle"]');
    const statusBadge = document.querySelector('[data-testid="test-todo-status"]');
    const timeRemainingEl = document.querySelector('[data-testid="test-todo-time-remaining"]');
    const dueDateEl = document.querySelector('[data-testid="test-todo-due-date"]');
    const editBtn = document.querySelector('[data-testid="test-todo-edit-button"]');
    const deleteBtn = document.querySelector('[data-testid="test-todo-delete-button"]');
    const dueDate = new Date('2026-04-16T23:59:00Z');

    function updateTimeRemaining() {
        const now = new Date();
        const diff = dueDate - now;

        let timeStr = "";

        if (diff <= 0) {
            timeStr = "Overdue!";
        } else {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

            if (days > 1) {
                timeStr = `Due in ${days} days`;
            } else if (days === 1) {
                timeStr = "Due tomorrow";
            } else if (hours > 0) {
                timeStr = `Due in ${hours} hour${hours > 1 ? 's' : ''}`;
            } else if (minutes > 0) {
                timeStr = `Due in ${minutes} minute${minutes > 1 ? 's' : ''}`;
            } else {
                timeStr = "Due now!";
            }
        }

        timeRemainingEl.textContent = timeStr;
        timeRemainingEl.setAttribute('datetime', dueDate.toISOString());
    }
    completeToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            todoCard.classList.add('completed');
            statusBadge.textContent = "Done";
            statusBadge.classList.remove('status-pending');
            statusBadge.classList.add('status-done');
        } else {
            todoCard.classList.remove('completed');
            statusBadge.textContent = "Pending";
            statusBadge.classList.remove('status-done');
            statusBadge.classList.add('status-pending');
        }
    });

    editBtn.addEventListener('click', () => {
        console.log("edit clicked");
        alert("Edit button clicked! This is a dummy action.");
    });

    deleteBtn.addEventListener('click', () => {
        console.log("delete clicked");
        alert("Delete button clicked! This is a dummy action.");
    });
    updateTimeRemaining();
    setInterval(updateTimeRemaining, 60000);
});
