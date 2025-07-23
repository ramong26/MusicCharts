declare global {
  namespace NodeJS {
    interface Global {
      mongoose?: {
        conn: mongoose.Connection | null; // 인스턴스 타입
        promise: Promise<mongoose.Mongoose> | null; // connect() 반환 타입
      };
    }
  }
}
