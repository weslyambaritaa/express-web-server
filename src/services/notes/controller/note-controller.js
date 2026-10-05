import { nanoid } from "nanoid";

import notes from "../notes.js";
import response from "../../../utils/response.js";
import NotFoundError from "../../../exceptions/not-found-error.js";
import InvariantError from "../../../exceptions/invariant-error.js";

/**
 * Menambahkan catatan baru.
 */
export const createNote = (req, res, next) => {
  const { title = "untitled", tags = [], body = "" } = req.body;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    id,
    title,
    tags,
    body,
    createdAt,
    updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.some((note) => note.id === id);

  if (!isSuccess) {
    return next(new InvariantError("Catatan gagal ditambahkan"));
  }

  return response(res, 201, "Catatan berhasil ditambahkan", {
    noteId: id,
  });
};

/**
 * Menampilkan seluruh catatan.
 *
 * Contoh pencarian:
 * GET /notes?title=belajar
 */
export const getAllNotes = (req, res) => {
  const { title = "" } = req.query;

  let filteredNotes = notes;

  if (title !== '') {
  const note = notes.filter((note) => note.title === title);
  return response(res, 200, 'success', { notes: note });
}

  return response(res, 200, "success", {
    notes: filteredNotes,
  });
};

/**
 * Menampilkan satu catatan berdasarkan ID.
 */
export const getNoteById = (req, res, next) => {
  const { id } = req.params;

  const note = notes.find((currentNote) => currentNote.id === id);

  if (!note) {
    return next(new NotFoundError("Catatan tidak ditemukan"));
  }

  return response(res, 200, "Catatan berhasil ditampilkan", {
    note,
  });
};

/**
 * Memperbarui catatan berdasarkan ID.
 */
export const editNoteById = (req, res, next) => {
  const { id } = req.params;
  const { title, tags, body } = req.body;

  const index = notes.findIndex((note) => note.id === id);

  if (index === -1) {
    return next(new NotFoundError("Catatan tidak ditemukan"));
  }

  const updatedAt = new Date().toISOString();

  notes[index] = {
    ...notes[index],
    title,
    tags,
    body,
    updatedAt,
  };

  return response(res, 200, "Catatan berhasil diperbarui", {
    note: notes[index],
  });
};

/**
 * Menghapus catatan berdasarkan ID.
 */
export const deleteNoteById = (req, res, next) => {
  const { id } = req.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index === -1) {
    return next(new NotFoundError("Catatan tidak ditemukan"));
  }

  notes.splice(index, 1);

  return response(res, 200, "Catatan berhasil dihapus");
};
