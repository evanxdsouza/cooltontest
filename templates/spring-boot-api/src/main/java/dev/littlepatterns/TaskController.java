package dev.littlepatterns;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/api/tasks")
class TaskController {
    private final AtomicLong ids = new AtomicLong();
    private final List<TaskView> tasks = new CopyOnWriteArrayList<>();

    @GetMapping
    List<TaskView> list() { return List.copyOf(tasks); }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    TaskView create(@Valid @RequestBody NewTask input) {
        var task = new TaskView(ids.incrementAndGet(), input.title().trim(), false);
        tasks.add(task);
        return task;
    }

    @PatchMapping("/{id}/toggle")
    TaskView toggle(@PathVariable long id) {
        for (int i = 0; i < tasks.size(); i++) {
            var task = tasks.get(i);
            if (task.id() == id) {
                var updated = new TaskView(task.id(), task.title(), !task.done());
                tasks.set(i, updated);
                return updated;
            }
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found");
    }

    record NewTask(@NotBlank @Size(max = 120) String title) {}
    record TaskView(long id, String title, boolean done) {}
}
