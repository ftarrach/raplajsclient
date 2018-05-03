function columnWidth(appointments) {
  if (appointments.length > 0) {
    return Math.max(...appointments.map(a => a.column)) + 1
  }
  return 1
}

export {
  columnWidth
}
