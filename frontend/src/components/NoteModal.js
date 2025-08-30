import React, { useState, useEffect } from "react";

function NoteModal({ note, onSave, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    content: ""
  });

  useEffect(() => {
    if (note) {
      setFormData({
        title: note.title,
        content: note.content
      });
    }
  }, [note]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim() && formData.content.trim()) {
      onSave(formData);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {note ? "Edit Note" : "Create New Note"}
          </h2>
          <button 
            className="modal-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter note title"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Content</label>
              <textarea
                name="content"
                className="form-control"
                value={formData.content}
                onChange={handleChange}
                rows="6"
                placeholder="Write your note content here..."
                required
              />
            </div>
            
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {note ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NoteModal;