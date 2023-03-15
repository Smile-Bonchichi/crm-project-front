import React, { useEffect, useState } from 'react';
import Header from '../../ui/header/Header';
import { RouterUrl } from '../../app/router/Routers';
import axios from '../../app/rest';
import Button from '../../ui/button/Button';
import Dictionary from '../../ui/dictionary/Dictionary';
import Modal from '../../ui/modal/Modal';

const BudgetPage = () => {
    const [budget, setBudget] = useState({});
    const [budgets, setBudgets] = useState([]);
    
    const [openAdd, setOpenAdd] = useState(false);
    
    useEffect(() => {
        getAll();
    }, []);
    
    const getAll = () => {
        axios.get(`/dictionary/budget`).then(res => {
            setBudgets(res);
        });
    };
    
    const allSum = () => {
        let sum = 0;
        
        for (let i = 0; i < budgets.length; i++) {
            sum = sum + budgets[i].sum;
        }
        
        return sum;
    };
    
    const addBudget = () => {
        axios.post(`/dictionary/budget?sum=${ budget.sum }`).then(() => {
            getAll();
        });
    };
    
    const deleteBudget = (id) => {
        axios.delete(`/dictionary/budget?id=${ id }`).then(() => {
            getAll();
        });
    };
    
    const onChange = (e) => {
        setBudget({ sum: e.target.value });
    };
    
    return (
        <div>
            <Header text={ RouterUrl.BUDGET_PAGE.name }/>
            
            <Button
                className={ 'add_button' }
                text={ '+' }
                onClick={ () => setOpenAdd(true) }
            />
            
            <table style={ {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: 'solid',
                width: '90vw'
            } }>
                {
                    budgets.map((item, index) => {
                        return (
                            <tr key={ index }>
                                <Dictionary name={ item.sum }/>
                                
                                <Button
                                    className={ 'close-button' }
                                    text={ 'Удалить' }
                                    onClick={ () => deleteBudget(item.id) }
                                />
                            </tr>
                        );
                    })
                }
            </table>
            
            <span> Общая сумма: { allSum() } </span>
            
            <Modal
                open={ openAdd }
                child={
                    <>
                        <div className='modal-desc'>
                            <label htmlFor='name'>
                                <p>Название</p>
                                <input id='name' onChange={ onChange }
                                       value={ budget.sum } type='number'/>
                            </label>
                        </div>
                        <div className='modal-footer'>
                            <Button
                                className={ 'secondary-button' }
                                text={ 'Закрыть' }
                                onClick={ () => setOpenAdd(false) }
                            />
                            
                            <Button
                                className={ 'primary-button' }
                                text={ 'Сохранить' }
                                onClick={ addBudget }
                            />
                        </div>
                    </>
                }
                onCLose={ () => setOpenAdd(false) }
            />
        </div>
    );
};

export default BudgetPage;