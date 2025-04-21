import cron from 'node-cron';
import { expiryTransactionJob } from './jobs/expiry.transaction.job';

export const expiryTransactionSchedule = () => {
  cron.schedule('* * * * *', () => {
    expiryTransactionJob();
  });
};
