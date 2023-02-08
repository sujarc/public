package com.thevirtugroup.postitnote.rest;

import com.thevirtugroup.postitnote.model.Notes;
import com.thevirtugroup.postitnote.service.NoteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 */
@RestController
@RequestMapping("/notes")
public class NoteController
{
    private NoteService noteService = new NoteService();
    @RequestMapping(method = RequestMethod.GET)
    public List<Notes> view(@RequestParam(name = "user") String user) {
        return noteService.getNotes(user);
    }

    @RequestMapping(method = RequestMethod.POST)
    public List<Notes> create(@RequestBody List<Notes> notes, @RequestParam(name = "user") String user) {
        return noteService.createNotes(notes, user);
    }
}
