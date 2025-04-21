import app from './app';
// import { scheduleTasks } from './cron/schedule.tasks';
import { startAllSchedules } from './cron';

const PORT = process.env.PORT || 5000;

// scheduleTasks()
startAllSchedules()

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
