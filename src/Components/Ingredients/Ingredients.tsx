import { RecordModel } from "pocketbase";
import { useEffect, useState } from "react";

export default function Ingredients(props: any) {
  const [ingredients, setIngredients] = useState<RecordModel | null>(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      if (!props) {
        return;
      }
      setIngredients(props.props);
    } catch (error) {}
  };

  return (
    <>
      <h1>Du trenger</h1>

      <table>
        <tbody>
          {ingredients &&
            ingredients.map((ingredient: RecordModel) => (
              <tr key={ingredient[0]}>
            
                <td key={ingredient[0] + "0"}>{ingredient[0]}</td>
                <td key={ingredient[0] + "1"}>{ingredient[1]}</td>
                <td key={ingredient[0] + "2"}>{ingredient[2]}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
