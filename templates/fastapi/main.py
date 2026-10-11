from itertools import count
from typing import Annotated

from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, Field, field_validator

app = FastAPI(title="Pocket Tasks API", version="1.0.0")

class TaskCreate(BaseModel):
    title: Annotated[str, Field(min_length=1, max_length=120)]

    @field_validator("title")
    @classmethod
    def normalize_title(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("title must not be blank")
        return value

class Task(TaskCreate):
    id: int
    done: bool = False

_ids = count(1)
_tasks: dict[int, Task] = {}

@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}

@app.get("/tasks", response_model=list[Task])
def list_tasks() -> list[Task]:
    return list(_tasks.values())

@app.post("/tasks", response_model=Task, status_code=status.HTTP_201_CREATED)
def create_task(payload: TaskCreate) -> Task:
    task = Task(id=next(_ids), title=payload.title)
    _tasks[task.id] = task
    return task

@app.patch("/tasks/{task_id}", response_model=Task)
def toggle_task(task_id: int) -> Task:
    task = _tasks.get(task_id)
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    updated = task.model_copy(update={"done": not task.done})
    _tasks[task_id] = updated
    return updated

@app.delete("/tasks/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(task_id: int) -> None:
    if _tasks.pop(task_id, None) is None:
        raise HTTPException(status_code=404, detail="Task not found")
