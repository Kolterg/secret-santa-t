import './landing.css'
import { Link } from 'react-router-dom';

export default function Landing() {
    return (
        <div className="landing">
            <h2>Вітаю на сайті таємного санти!</h2>
            <button><Link to={'add'} className="link">Створити кімнтау</Link></button>
            <button><Link to={'toch'} className="link">Зв'язатісь з партером</Link></button>
        </div>
    );
}