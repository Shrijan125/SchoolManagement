import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './ui/dialog';

const ValidationErrorsDialog = ({
  errors,
  isOpen,
  onClose,
}: {
  errors: { row: number; errors: string[] }[];
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Validation Errors</DialogTitle>
          <DialogDescription>
            The following errors were found in your Excel file:
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-auto">
          {errors.map(({ row, errors }, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold">Row {row}</h3>
              <ul className="list-disc pl-6">
                {errors.map((error, errorIndex) => (
                  <li key={errorIndex} className="text-sm text-red-500">
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ValidationErrorsDialog;
