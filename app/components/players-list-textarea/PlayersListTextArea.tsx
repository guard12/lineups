import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type PlayersListTextAreaProps = {
  textareaValue: string;
  handleTextareaChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export const PlayersListTextArea: React.FC<PlayersListTextAreaProps> = ({
  textareaValue,
  handleTextareaChange,
}: PlayersListTextAreaProps) => {
  return (
    <div>
      <Label>Add players</Label>
      <Textarea
        rows={20}
        value={textareaValue}
        onChange={handleTextareaChange}
        placeholder="Enter one player name per line"
        className="mt-2"
      />
    </div>
  );
};
