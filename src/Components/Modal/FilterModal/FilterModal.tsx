import { SortBy } from "../../../Model/SortBy";
import styles from "./FilterModal.module.css";

interface FilterModalProps {
  onClose: (sortBy: SortBy) => void;
  lastSortBy: SortBy;
}

export default function FilterModal({ onClose, lastSortBy }: FilterModalProps) {
  return (
    <div className={styles.body} onClick={(e) => {
        if(e.target === e.currentTarget){
            onClose(lastSortBy)}
        }
    }
    
    >
      <div className={styles.modal}>
        {[
          "Nyeste først",
          "Eldste først",
          "Mest populær",
          "Minst populær",
          "A-Å",
          "Å-A",
        ].map((value, index) => (
          <div key={value} className={styles.checkBoxContainer}>
            <input
              defaultChecked={lastSortBy === index}
              type="radio"
              name="sortBy"
              id={value}
              value={index}
              z-index={10}
              onChange={() => {                
                onClose(index as SortBy);}}
            />
            <label htmlFor={value}>{value}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
