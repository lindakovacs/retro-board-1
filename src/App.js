import React, { Component } from 'react';
import Card from './components/Card/Card'
import AddCard from './components/AddCard/AddCard'
import './retro-board.css';

// Categories Data
const categories = [
  {
    category_id: 1,
    name: 'Went Well',
    showNewCard: false,
    cards: [],
  },
  {
    category_id: 2,
    name: 'To Improve',
    showNewCard: false,
    cards: [],
  },
  {
    category_id: 3,
    name: 'Action Items',
    showNewCard: false,
    cards: [],
  },
];
class App extends Component {
    // state to hold categories and data used when adding, deleting, moving cards
    state = {
    categories: categories,
    showAddCardCategory: null,
    showAddCard: false,
    inputValue: '',
    inputCategory: 0,
    cardAdded: {},
    cardToMove: null,
    cardBackgroundColorClassName: "RetroBoardCategory-"
    };

    // Function used to handle the textarea value for new card
    handleChange = (e) => {
        this.setState({ 
            inputValue: e.target.value,
            inputCategory: this.state.inputCategory
        });
    };

    // Function to add input value of new card to the categories
    addNewCard = (e, cat_index) => {
        e.preventDefault();
        if (this.state.inputValue) {
            this.setState({
            categories: this.state.categories.map((category, index) => {
                if (category.category_id === this.state.categories[cat_index].category_id){
                        category.cards.push({ card_id: category.cards.length, title: this.state.inputValue})
                    }
                    return category;
                }),
            inputValue: '',
            inputCategory: null,
            showAddCard: !this.state.showAddCard,
            showAddCardCategory: !this.state.showAddCardCategory
            })
        } else {
            alert("New Card Cannot be Empty!!")
        }
    };

    // function to delete a New card
    deleteNewCard = () => {
    this.setState({
        showAddCard: !this.state.showAddCard,
        inputValue: ''
    })
    };

    // function to move a card to the left
    moveLeft = (cat_index, new_cat_index, card_id) => {
        const cardToMove = this.state.categories[cat_index].cards.find((card, idx) => {return card.card_id === card_id ? card.title : null;});
        this.setState({
            categories: this.state.categories.map((category, index) => {
                if (category.category_id === this.state.categories[new_cat_index].category_id) {
                    let cards_max = Math.max(...Object.keys(category.cards));
                    category.cards.push({card_id: cards_max + Math.floor(Math.random() * 100), title: cardToMove.title});
                }
                return category;
            }),
        }, this.deleteCard(cat_index, card_id));
    };

    // function to move a card to the right
    moveRight = (cat_index, new_cat_index, card_id) => {
        const cardToMove = this.state.categories[cat_index].cards.find((card, idx) => { return card.card_id === card_id ? card.title : null; });
        this.setState({
            categories: this.state.categories.map((category, index) => {
                if (category.category_id === this.state.categories[new_cat_index].category_id) {
                    let cards_max = Math.max(...Object.keys(category.cards));
                    console.log(Math.floor(Math.random() * 100));
                    category.cards.push({ card_id: cards_max + Math.floor(Math.random() * 100), title: cardToMove.title});
                }
                return category;
            }),
        }, this.deleteCard(cat_index, card_id));
    };

    // function to delete an existing card
    deleteCard = (cat_index, card_id) => {
        this.setState({
            categories: this.state.categories.map((category, index) => {
                if (cat_index === index)
                    category.cards = category.cards.filter((card, idx) => {
                        return card.card_id !== card_id;
                    })
                return category;
            })
        })
    };

  render() {
      const { showAddCard } = this.state;
    return (
    <div className="content">
        <h1>Retrospective Board</h1>
            <div className="RetroBoard">
            {this.state.categories.map((category, cat_index) => {
                const cardBackgroundColorClassName = "RetroBoardCategory-" + category.category_id;
                return <div className="RetroBoardCategory" key={category.category_id}>
                        <h2>{category.name}</h2>
                        <div className="Retro button button-new">
                            <button className="ButtonGroup" onClick={() => this.setState({ showAddCard: !this.state.showAddCard, showAddCardCategory: cat_index })}>+</button>
                        </div>
                        {(showAddCard && this.state.showAddCardCategory === cat_index) ? 
                        <AddCard 
                        cardBackgroundColorClassName={cardBackgroundColorClassName}
                        cat_index={cat_index}
                        addNewCard={this.addNewCard}
                        deleteNewCard={this.deleteNewCard}
                        inputValue={this.inputValue}
                        handleChange={this.handleChange}
                        />
                        : null}
                        <div className = { cardBackgroundColorClassName }>
                            {category.cards && category.cards.map((card, card_index) => {
                                return <Card 
                                key = {card_index}
                                card={card} 
                                card_id={card.card_id} 
                                card_index={card_index}
                                cat_index={cat_index}
                                new_right_cat_index={cat_index === this.state.categories.length - 1 ? 0 : cat_index + 1}
                                new_left_cat_index={cat_index === 0 ? this.state.categories.length - 1 : cat_index - 1}
                                moveLeft={this.moveLeft}
                                deleteCard={this.deleteCard}
                                moveRight={this.moveRight}
                                categories={this.state.categories}
                                />
                                }
                            )}
                        </div>
                    </div>;
            })}
        </div>
    </div>
    )
  };
}

export default App;
