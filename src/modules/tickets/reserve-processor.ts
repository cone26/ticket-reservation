import { Job, Queue } from 'bullmq';
import { TicketService } from './ticket.service';
import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { DoneCallback } from 'bull';

@Processor('reserveTicket')
export class ReserveProcessor {
  constructor(
    private readonly ticketService: TicketService,
    @InjectQueue('reserveTicket')
    private reserveQueue: Queue,
  ) {}

  @Process('reserve')
  async transcode(job: Job, cb: DoneCallback) {
    await this.ticketService.reserveTicket(
      Number(job.data.concertId),
      job.data.seatNumber,
      job.data.userName,
    );
    return cb(null, JSON.stringify(job.data));
  }
}
