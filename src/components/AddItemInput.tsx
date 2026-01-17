import { useState, KeyboardEvent } from 'react';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface AddItemInputProps {
  placeholder: string;
  onAdd: (text: string) => void;
}

export const AddItemInput = ({ placeholder, onAdd }: AddItemInputProps) => {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (value.trim()) {
      onAdd(value.trim());
      setValue('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="flex-1 bg-background border-muted focus:border-primary transition-colors"
      />
      <Button
        onClick={handleSubmit}
        size="icon"
        disabled={!value.trim()}
        className="bg-primary hover:bg-primary/90 disabled:opacity-40"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};
