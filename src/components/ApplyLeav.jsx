import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

const ApplyLeav = () => {
    const { user } = useAuthContext()

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [reason, setReason] = useState('')
    const [error, setError] = useState(null)
    const [emptyField, setEmptyField] = useState([])

    useEffect(() => {
        setEmail(user.user.email)
        setName(user.user.name)
    }, [])
    
    const handleApply = async () => {
        
        if (!user) {
            setError('You must be logged in');
            return;
        }

        const Leav  = { email, reason, name };

        const response = await fetch('https://hrm-backend-zjvm.onrender.com/api/hrs/applyLeav', {
            method: 'POST',
            body: JSON.stringify(Leav),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        } else {
            setError(null);
            setEmptyField([])
            setReason('')
            
            
            
        }
    };
  return (
    <div>
      <form className="create" onSubmit={handleApply}>
        <h3 className='text-[18px] font-bold pb-3 mt-5'>Apply leave</h3>
        <label htmlFor="">Reason :</label>
        <textarea 
            type="text" 
            onChange={(e)=>setReason(e.target.value)}
            value={reason}
            className={emptyField.includes('reason') ? 'error' : 'bg-transparent input input-bordered'}
        />
        
        { error && <div className='error'>{error}</div> }

        <button className="btn btn-outline btn-primary">Apply Leav</button>
    </form>
    </div>
  )
}

export default ApplyLeav
