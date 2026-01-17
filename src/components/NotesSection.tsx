import { FileText } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { SectionCard } from './SectionCard';

interface NotesSectionProps {
  notes: string;
  onUpdate: (notes: string) => void;
}

export const NotesSection = ({ notes, onUpdate }: NotesSectionProps) => {
  return (
    <SectionCard title="今日备注" icon={<FileText className="w-5 h-5" />}>
      <Textarea
        value={notes}
        onChange={(e) => onUpdate(e.target.value)}
        placeholder="记录今天的想法、心得或其他备注..."
        className="min-h-[120px] resize-none bg-background border-muted focus:border-primary transition-colors"
      />
    </SectionCard>
  );
};
