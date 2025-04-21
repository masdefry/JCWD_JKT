import cron from 'node-cron';

export const scheduleTasks = () => {
  cron.schedule('* * * * *', () => {
    console.log('Task is running every minute');
  });
};
