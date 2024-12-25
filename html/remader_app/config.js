export const config = {
    maxTasks: 500, // Maximum number of tasks allowed
    task: {
        minRescheduleDelay: 10 * 60 * 1000, // minimum delay for reschedule in milisecond
        maxRescheduleDelay: 30 * 60 * 1000, // maximum delay for reschedule in milisecond
    }
};