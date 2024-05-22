
import { useEffect, useState } from "react";
import styles from "./Amount.module.css";

interface AmountProps {
  unit: string;
  quantity: number;
  callback: (val: number) => void;
}

export default function Amount({ unit, quantity, callback }: AmountProps) {
  const [currentQuantity, setCurrentQuantity] = useState<number>(quantity);

  useEffect(() => {
    setCurrentQuantity(quantity);
  }, [quantity]);

  return (
    <>
      <div className={styles.amountBox}>
        <h3>Ingrediensene gir</h3>
        <table>
          <tbody>
            <tr>
              <td>
                <button
                  className={styles.button}
                  onClick={() => {
                    const newQuantity = currentQuantity - 1;
                    setCurrentQuantity(newQuantity);
                    callback(newQuantity);
                  }}
                >
                  <i className="fa fa-light fa-minus"></i>
                </button>
              </td>
              <td>
                <input
                  onChange={(e) => {
                    const newQuantity = parseInt(e.target.value);
                    setCurrentQuantity(newQuantity);
                    if (Number.isNaN(newQuantity)) {
                      callback(1);
                    } else {
                      callback(newQuantity);
                    }
                  }}
                  type="number"
                  value={currentQuantity}
                  className={styles.inputIng}
                />
              </td>
              <td>
                <button
                  className={styles.button}
                  onClick={() => {
                    const newQuantity = currentQuantity + 1;
                    setCurrentQuantity(newQuantity);
                    callback(newQuantity);
                  }}
                >
                  <i className="fa fa-light fa-plus"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <h3>{unit}</h3>
      </div>
    </>
  );
}
