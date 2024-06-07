import styles from "./Home.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecipeCard from "../RecipeCard/RecipeCard";
import { IRecipe } from "../../Model/Recipe";
import { API } from "../../API/API";
import Header from "../Header/Header";
import { SortBy, SortByClass } from "../../Model/SortBy";
import FilterModal from "../Modal/FilterModal/FilterModal";

function Home() {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(SortBy.MOSTPOPULAR);
  const [modalOpen, setModalOpen] = useState(false);
  const [filteredRecipes, setFilteredRecipes] = useState<IRecipe[]>([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await API.get("api/recipe");
      if (!res) return;
      if (!res.data.isOk) return;
      const fetchedRecipes: IRecipe[] = res.data.recipe;
      setRecipes(SortByClass.sort(SortBy.MOSTPOPULAR, fetchedRecipes));
    } catch (error) {}
  };

  useEffect(() => {
    if (search === "") {
      setFilteredRecipes(recipes);
      return;
    }
    const filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredRecipes(filtered);
  }, [search, recipes]);

  const closeModal = (sortBy: SortBy) => {
    setModalOpen(false);
    setFilter(sortBy);
    let sortedRecipes = [...filteredRecipes];
    let sortedAll = [...recipes];
    SortByClass.sort(sortBy, sortedAll);
    SortByClass.sort(sortBy, sortedRecipes);
    setRecipes(sortedAll);
    setFilteredRecipes(sortedRecipes);
  };

  return (
    <>
      <Header />
      {modalOpen && (
        <FilterModal onClose={closeModal} lastSortBy={filter}></FilterModal>
      )}

      <div className={styles.body}>
        <div className={styles.content}>
          <h2 className={styles.title}>Oppskrifter</h2>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Søk etter oppskrift"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
            <button
              className={styles.filterButton}
              onClick={() => setModalOpen(true)}
            >
              <i className="fa fa-arrow-down-wide-short"></i>
            </button>
          </div>

          <ul className={styles.recipeList}>
            {filteredRecipes &&
              filteredRecipes.map((recipe: IRecipe) => (
                <li key={recipe._id} className={styles.listElement}>
                  <Link
                    className={styles.recipeLink}
                    to={`/recipes/${recipe._id}`}
                  >
                    <RecipeCard {...recipe} />
                  </Link>
                </li>
              ))}
            {filteredRecipes.length === 0 && (
              <li className={styles.listElement}>
                <div className={styles.noRecipes}>
                  <h2 className={styles.header}>Ingen oppskrifter funnet</h2>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Home;
