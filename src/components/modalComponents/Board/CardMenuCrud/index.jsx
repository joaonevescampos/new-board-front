import styles from './index.module.css';
import { useState, useEffect, useRef } from 'react';
import { FaEllipsisV, FaRegTrashAlt, FaEdit, FaRegClone } from 'react-icons/fa';

const CardMenuCrud = ({ card, index, onDuplicate, onEdit, onDelete }) => {
    
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });;
    const cardWithPosition = { index, ...card };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [])

    const toggleMenu = (event) => {
        let xPosition = event.clientX;
        let rightPosition = 'none';

        if (event.clientX > 0.80 * window.innerWidth) {
            rightPosition = '20px';
            xPosition = 'none';

            setMenuPosition({
                x: xPosition,
                y: event.clientY,
                r: rightPosition
            });
        } else {
            setMenuPosition({
                x: xPosition,
                y: event.clientY,
                r: rightPosition
            });
        }
        setMenuOpen(true);
    };

    return (
            <div className={styles.menu_icons_container}>
            <FaEllipsisV
                className={`${styles.ellipsis} ${styles.icon}`}
                onClick={toggleMenu}
            />
            {
                (menuOpen) && (
                    <nav className={styles.menu_open}
                        ref={menuRef}
                        style={{
                            top: menuPosition.y,
                            left: menuPosition.x,
                            right: menuPosition.r
                        }}
                    >
                        <ul className={styles.menu_items}>
                            <li className={styles.item}>
                                <div
                                    className={styles.crud_option}
                                    onMouseDown={() => onDuplicate(cardWithPosition)}
                                    onClick={() => { setMenuOpen(false) }}
                                >
                                    <FaRegClone
                                        className={`${styles.crud_icons} 
                                    ${styles.icon}`}
                                    />
                                    <p className={styles.menu_crud_title}>
                                        Duplicate
                                    </p>
                                </div>
                            </li>
                            <li className={styles.item}>
                                <div
                                    className={styles.crud_option}
                                    onMouseDown={() => onEdit(cardWithPosition)}
                                    onClick={() => { setMenuOpen(false) }}
                                >  
                                    <FaEdit
                                        className={`${styles.crud_icons} ${styles.icon}`}
                                    />
                                    <p className={styles.menu_crud_title}>
                                        Edit
                                    </p>
                                </div>
                            </li>
                            <li className={styles.item}>
                                <div
                                    className={styles.crud_option}
                                    onClick={() => onDelete(card.id, index)}
                                >
                                    <FaRegTrashAlt className={` ${styles.trash}`} />
                                    <p className={`${styles.menu_crud_title} ${styles.text}`}>
                                        Delete
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </nav>               
                )
            }
        </div >       
    );
};

export default CardMenuCrud;