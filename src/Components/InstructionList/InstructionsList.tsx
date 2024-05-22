import { useEffect, useState } from "react";
import styles from "./InstructionsList.module.css";


interface InstructionsListProps {
    instructions: string[];
    }

export default function InstructionsList({instructions}: InstructionsListProps) {
  const [currentInstructions, setCurrentInstructions] = useState<string[] | null>(null);

  useEffect(() => {
    setCurrentInstructions(instructions);
  }, [instructions]);

  return (
    <>
      <h1 className={styles.title}>Slik gjør du</h1>

      <ol className={styles.ol}>
        {currentInstructions &&
          currentInstructions.map((instruction: string) => (
            <li key={instruction} className={styles.li}>
              {instruction}
            </li>
          ))}
      </ol>
    </>
  );
}
