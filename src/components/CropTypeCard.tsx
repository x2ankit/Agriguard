import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CROP_OPTIONS = [
  "Wheat",
  "Rice",
  "Corn",
  "Cotton",
  "Sugarcane",
  "Others",
] as const;

const CropTypeCard = () => {
  const [crop, setCrop] = useState<typeof CROP_OPTIONS[number] | undefined>(undefined);

  return (
    <Card className="bg-white text-foreground shadow-sm rounded-lg p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h3 className="text-lg font-poppins font-semibold text-green-600">Crop Type</h3>
        <Select value={crop} onValueChange={(v) => setCrop(v as typeof CROP_OPTIONS[number])}>
          <SelectTrigger
            className="h-9 w-fit min-w-[180px] rounded-full border-2 border-green-600/90 bg-white px-4 text-sm font-medium text-green-700 hover:bg-green-50 focus:border-green-600 focus:ring-green-600 focus:ring-offset-2 ring-offset-white"
            aria-label="Select crop type"
          >
            <SelectValue placeholder="Select crop" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {CROP_OPTIONS.map((opt) => (
              <SelectItem key={opt} value={opt} className="cursor-pointer">
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </Card>
  );
};

export default CropTypeCard;
