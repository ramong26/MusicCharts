export {};

declare global {
  interface Scheduler {
    yield?: () => Promise<void>;
  }
  interface Global {
    scheduler?: Scheduler;
  }

  namespace NodeJS {
    interface Global {
      mongoose?: {
        conn: mongoose.Connection | null;
        promise: Promise<mongoose.Mongoose> | null;
      };
    }
  }
}
