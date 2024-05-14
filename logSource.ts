import { WriteLog } from "./flowerful"

export class LogSource
{
  logID = ""

  constructor(myID: string)
  {
    this.logID = myID
  }

  write(message: string)
  {
    WriteLog(this.logID, message)
  }
}
