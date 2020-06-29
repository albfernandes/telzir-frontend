import React, { useState, useEffect } from 'react';
import {Container, CustomForm, Display} from './styles'
import api from '../../services/api';
import swal from 'sweetalert';

export default function Form () {

    const [formData, setFormData] = useState({});
    const [plans, setPlans] = useState([]);
    const [prices, setPrices] = useState({});

    useEffect(() => {
        async function fetchAPI() {
            const response = await api.get('/plans', {});
            setPlans(response.data)
        }

        fetchAPI();
    }, []);


    async function handleSubmit (event) {
        event.preventDefault();

        if(!formData.plan_id)
            return swal('Please, choose one plan!');

        try{
            const response = await api.post('/calculators', formData);
            setPrices(response.data);
        }catch (err) {
            swal(err.response.data.description);
        }
    }

    return (
        <Container>
            <CustomForm onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="source">Origem</label>
                    <input name="source" type="text" className="form-control"
                           id="source" maxLength="3" required
                           onChange={event => setFormData({...formData, source: event.target.value})}
                    />
                </div>

                <div className="form-group">
                <label htmlFor="destiny">Destino</label>
                    <input name="destiny" type="text" className="form-control"
                           id="destiny" maxLength="3" required
                           onChange={event => setFormData({...formData, destiny: event.target.value})}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="time">Minutos</label>
                    <input name="time" type="number" className="form-control"
                           id="destiny" required
                           onChange={event => setFormData({...formData, time: event.target.value})}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="plans">Planos</label>
                    <select className="form-control" id="plans" name="plans"
                            onChange={event => setFormData({...formData, plan_id: event.target.value})}>
                        <option></option>
                        {plans && plans.map(plan => {
                            return <option value={plan.id} key={plan.id}>{plan.name}</option>
                        })}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </CustomForm>

            <Display>
                <h6>Sua simulação:</h6>

                <div className="form-group">
                    <label htmlFor="source">Com o plano</label>
                    <input type="text" className="form-control" id="source"
                           disabled={true}
                           value={prices.price_with_plan ? '$ ' + prices.price_with_plan.toFixed(2) : '$ 0.00'}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="destiny">Sem o plano</label>
                    <input type="text" className="form-control" id="destiny"
                           disabled={true}
                           value={prices.price_without_plan ? '$ ' + prices.price_without_plan.toFixed(2) : '$ 0.00'}
                    />
                </div>
            </Display>
        </Container>
    );
};