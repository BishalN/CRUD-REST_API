import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

type note = {
  topic: string;
  description: string;
  id: number;
};

@Controller()
export class AppController {
  notes: note[] = [];

  @Get()
  getAllnote(): note[] {
    return this.notes;
  }

  @Get('/:id')
  getNoteById(@Param('id') id: number): note {
    const noteIndex = this.notes.findIndex((note) => note.id === Number(id));
    return this.notes[noteIndex];
  }

  @Post()
  createnote(@Body() { description, topic }: note) {
    const randomId = Math.floor(Math.random() * 999);
    const note = { description, topic, id: randomId };
    this.notes.push(note);
    return note;
  }

  @Put('/:id')
  updatenote(@Param('id') id: number, @Body() newNote: Partial<note>): note {
    const noteIndex = this.notes.findIndex((note) => note.id === Number(id));
    this.notes[noteIndex] = { ...this.notes[noteIndex], ...newNote };
    return this.notes[noteIndex];
  }

  @Delete('/:id')
  deletenote(@Param('id') id: number): boolean {
    const noteIndex = this.notes.findIndex((note) => note.id === Number(id));
    if (noteIndex === -1) return false;
    delete this.notes[noteIndex];
    return true;
  }
}
