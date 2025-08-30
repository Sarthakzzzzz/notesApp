import React, { useEffect, useState } from "react";
import { notesAPI } from "../services/api";
import NoteModal from "./NoteModal";
import Dashboard from "./Dashboard";

function Noteslist({ user }) {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    if (user) {
      fetchNotes();
    }
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const response = await notesAPI.getAll(parseInt(user.id));
      setNotes(response.data);
      setFilteredNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = notes.filter(note => 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    setFilteredNotes(filtered);
  }, [notes, searchTerm, sortBy]);

  const handleCreateNote = () => {
    setEditingNote(null);
    setShowModal(true);
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setShowModal(true);
  };

  const handleDeleteNote = async (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await notesAPI.delete(id);
        fetchNotes();
      } catch (error) {
        console.error("Error deleting note:", error);
      }
    }
  };

  const handleSaveNote = async (noteData) => {
    try {
      if (editingNote) {
        await notesAPI.update(editingNote.id, {
          title: noteData.title,
          content: noteData.content
        });
      } else {
        const fullNoteData = {
          ...noteData,
          userId: parseInt(user.id),
          username: user.username,
          email: user.email || "user@example.com"
        };
        await notesAPI.create(fullNoteData);
      }
      
      setShowModal(false);
      setEditingNote(null);
      fetchNotes();
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  if (!user) {
    return (
      <div className="loading-screen">
        <p>Please log in to view notes.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading your notes...</p>
      </div>
    );
  }

  if (notes.length === 0 && !loading) {
    return (
      <>
        <Dashboard user={user} onCreateNote={handleCreateNote} />
        {showModal && (
          <NoteModal
            note={editingNote}
            onSave={handleSaveNote}
            onClose={() => setShowModal(false)}
          />
        )}
      </>
    );
  }

  return (
    <div className="app-content">
      {/* Header Section */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start', 
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ flex: '1', minWidth: '250px' }}>
          <h1 className="section-title">My Notes</h1>
          <p className="section-subtitle">
            {filteredNotes.length} {filteredNotes.length === 1 ? 'note' : 'notes'} found
          </p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={handleCreateNote}
          style={{ flexShrink: 0 }}
        >
          <span>✨</span>
          Create Note
        </button>
      </div>
      
      {/* Search and Filter Bar */}
      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        marginBottom: '2rem', 
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <div className="search-container" style={{ flex: '1', minWidth: '250px', margin: 0 }}>
          <div className="search-icon">🔍</div>
          <input
            type="text"
            placeholder="Search your notes..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div style={{ position: 'relative', width: '200px', flexShrink: 0 }}>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 2.5rem 0.75rem 1rem',
              background: 'white',
              color: '#2d3748',
              border: '2px solid #e2e8f0',
              borderRadius: '0.75rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer',
              appearance: 'none',
              WebkitAppearance: 'none',
              MozAppearance: 'none'
            }}
          >
            <option value="newest">📅 Newest First</option>
            <option value="oldest">📅 Oldest First</option>
            <option value="title">🔤 By Title</option>
          </select>
          <div style={{
            position: 'absolute',
            right: '0.75rem',
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            color: '#6b7280'
          }}>▼</div>
        </div>
      </div>

      {/* Notes Display */}
      <div style={{ marginTop: '2rem' }}>
        {filteredNotes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3 className="empty-state-title">No notes found</h3>
            <p className="empty-state-description">Try adjusting your search terms</p>
            <button 
              className="btn btn-primary"
              onClick={() => setSearchTerm('')}
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="card-grid">
            {filteredNotes.map((note, index) => (
              <div 
                key={note.id} 
                className="note-card animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="note-title">{note.title}</h3>
                <p className="note-content">
                  {note.content.length > 150 
                    ? `${note.content.substring(0, 150)}...` 
                    : note.content
                  }
                </p>
                
                <div className="note-meta">
                  <div>📅 {new Date(note.createdAt).toLocaleDateString()}</div>
                  {note.updatedAt !== note.createdAt && (
                    <div>✏️ Updated {new Date(note.updatedAt).toLocaleDateString()}</div>
                  )}
                </div>
                
                <div className="note-actions">
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => handleEditNote(note)}
                  >
                    <span>✏️</span>
                    Edit
                  </button>
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteNote(note.id)}
                  >
                    <span>🗑️</span>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Note Modal */}
      {showModal && (
        <NoteModal
          note={editingNote}
          onSave={handleSaveNote}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default Noteslist;