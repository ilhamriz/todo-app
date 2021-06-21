function Dropdown({status, handle}) {
  return (
    <div className="dropdown__menu">
      {status.map((stat, idx)=>(
        <div key={idx} className='dropdown__item' onClick={()=>handle(stat.value)}>
          {stat.title}
        </div>
      ))}
      <div className='dropdown__item' onClick={()=>handle('delete')}>
        Archive
      </div>
    </div>
  )
}

export default Dropdown
