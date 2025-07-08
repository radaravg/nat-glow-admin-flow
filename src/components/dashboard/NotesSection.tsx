import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { FileText, Plus, Edit3, Trash2, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const NOTES_STORAGE_KEY = 'nat-admin-notes';

export const NotesSection = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const { toast } = useToast();

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem(NOTES_STORAGE_KEY);
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (error) {
        console.error('Error loading notes:', error);
      }
    }
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const handleCreateNote = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide both title and content for the note.",
        variant: "destructive",
      });
      return;
    }

    // Simulate haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    const note: Note = {
      id: Date.now(),
      title: newNote.title,
      content: newNote.content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setNotes(prev => [note, ...prev]);
    setNewNote({ title: '', content: '' });
    setIsCreating(false);

    toast({
      title: "Note Created",
      description: "Your note has been saved successfully.",
    });
  };

  const handleUpdateNote = (id: number, updatedNote: Partial<Note>) => {
    // Simulate haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    setNotes(prev => 
      prev.map(note => 
        note.id === id 
          ? { ...note, ...updatedNote, updatedAt: new Date().toISOString() }
          : note
      )
    );
    setEditingId(null);

    toast({
      title: "Note Updated",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleDeleteNote = (id: number) => {
    // Simulate haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    setNotes(prev => prev.filter(note => note.id !== id));

    toast({
      title: "Note Deleted",
      description: "The note has been permanently removed.",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Admin Notes</h2>
              <p className="text-sm text-muted-foreground">
                Private notes and instructions (saved locally)
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Badge variant="secondary" className="bg-secondary/50">
              {notes.length} notes
            </Badge>
            <Button
              onClick={() => setIsCreating(true)}
              className="btn-premium"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Note
            </Button>
          </div>
        </div>
      </Card>

      {/* Create New Note */}
      {isCreating && (
        <Card className="glass-card p-6 animate-slide-up">
          <h3 className="text-lg font-semibold text-foreground mb-4">Create New Note</h3>
          
          <div className="space-y-4">
            <Input
              placeholder="Note title..."
              value={newNote.title}
              onChange={(e) => setNewNote(prev => ({ ...prev, title: e.target.value }))}
              className="bg-secondary/50 border-border/50 focus:border-primary/50"
            />
            
            <Textarea
              placeholder="Write your note here..."
              value={newNote.content}
              onChange={(e) => setNewNote(prev => ({ ...prev, content: e.target.value }))}
              rows={6}
              className="bg-secondary/50 border-border/50 focus:border-primary/50 resize-none"
            />
            
            <div className="flex items-center space-x-3">
              <Button
                onClick={handleCreateNote}
                className="btn-premium"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Note
              </Button>
              <Button
                onClick={() => {
                  setIsCreating(false);
                  setNewNote({ title: '', content: '' });
                }}
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Notes List */}
      <div className="space-y-4">
        {notes.map((note) => (
          <Card key={note.id} className="glass-card p-6 hover-glow">
            {editingId === note.id ? (
              <EditNoteForm
                note={note}
                onSave={(updatedNote) => handleUpdateNote(note.id, updatedNote)}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{note.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Created: {formatDate(note.createdAt)}
                      {note.updatedAt !== note.createdAt && (
                        <span> • Updated: {formatDate(note.updatedAt)}</span>
                      )}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => setEditingId(note.id)}
                      variant="ghost"
                      size="sm"
                      className="hover-glow text-muted-foreground hover:text-foreground"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => handleDeleteNote(note.id)}
                      variant="ghost"
                      size="sm"
                      className="hover-glow text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="text-foreground whitespace-pre-wrap">
                  {note.content}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {notes.length === 0 && !isCreating && (
        <Card className="glass-card p-12 text-center">
          <div className="w-16 h-16 bg-muted/20 rounded-xl flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No Notes Yet</h3>
          <p className="text-muted-foreground mb-6">
            Create your first admin note to keep track of important information.
          </p>
          <Button
            onClick={() => setIsCreating(true)}
            className="btn-premium"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create First Note
          </Button>
        </Card>
      )}
    </div>
  );
};

// Separate component for editing notes
interface EditNoteFormProps {
  note: Note;
  onSave: (updatedNote: Partial<Note>) => void;
  onCancel: () => void;
}

const EditNoteForm = ({ note, onSave, onCancel }: EditNoteFormProps) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      return;
    }
    onSave({ title, content });
  };

  return (
    <div className="space-y-4">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="bg-secondary/50 border-border/50 focus:border-primary/50"
      />
      
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={6}
        className="bg-secondary/50 border-border/50 focus:border-primary/50 resize-none"
      />
      
      <div className="flex items-center space-x-3">
        <Button
          onClick={handleSave}
          className="btn-premium"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
        <Button
          onClick={onCancel}
          variant="outline"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};