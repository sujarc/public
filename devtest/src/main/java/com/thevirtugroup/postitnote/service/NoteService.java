package com.thevirtugroup.postitnote.service;

import com.thevirtugroup.postitnote.model.Notes;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class NoteService {
    Map<String, List<Notes>> userNotes = new HashMap<>();

    public NoteService() {
        List<Notes> notes = new ArrayList<>();
        Notes notes1 = new Notes();
        notes1.setNoteSummary("This is a note");
        notes1.setTimedate("12/11/39");

        for (int i = 0; i < 6; ++i) {
            notes.add(notes1);
        }

        userNotes.put("user", notes);
    }

    public List<Notes> getNotes(String username) {
        return userNotes.get(username);
    }

    public List<Notes> createNotes(List<Notes> newNotes, String user) {
        userNotes.put(user, newNotes);
        return userNotes.get(user);
    }
}
