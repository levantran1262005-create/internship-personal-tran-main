# ERD

## Category

- id
- name

## Priority

- id
- name

## Task

- id
- title
- description
- status
- dueDate
- categoryId
- priorityId

## TaskHistory

- id
- taskId
- action
- createdAt

Quan hệ

Category 1 --- n Task

Priority 1 --- n Task

Task 1 --- n TaskHistory