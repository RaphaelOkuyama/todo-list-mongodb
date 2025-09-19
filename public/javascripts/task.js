const updateTaskStatus = async (taskId, isDone) => {

    const taskContainer = document.querySelector(`[data-task-id="${taskId}"]`);

    try {
        const body = { done: isDone };

        const response = await fetch(`/tasks/${taskId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error('Falha ao atualizar a tarefa no servidor.');
        }

        if (isDone) {
            taskContainer.classList.add('task-done');
        } else {
            taskContainer.classList.remove('task-done');
        }

    } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao atualizar a tarefa. A página será recarregada.');

        window.location.reload();
    }
}