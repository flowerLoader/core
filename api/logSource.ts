export type LogWriter = (Title: string, Message: string) => void;

export class LogSource
{
  logID: string;
  writer: LogWriter;

  constructor(myID: string, myWriter: LogWriter)
  {
    this.logID = myID;
    this.writer = myWriter;

    if (!myWriter)
      throw new Error("Writer expected in LogSource.ctor");
  }

  write(message: string)
  {
    this.writer(this.logID, message);
  }
}
