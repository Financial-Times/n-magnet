import { getFormattedDate } from '../../../src/components/eventpromo/eventpromo-utils'

describe('#getFormattedDate', () => {
  test('with two matching dates it should format the date', () => {
    const scheduledStartTime = new Date('2012-11-10 09:08:07')
    const scheduledEndTime = new Date('2012-11-10 09:08:07')
    expect(
      getFormattedDate({
        scheduledStartTime,
        scheduledEndTime
      })
    ).toEqual('10 November 2012')
  })

  test('with two different dates it should format both dates', () => {
    const scheduledStartTime = new Date('2012-11-10 09:08:07')
    const scheduledEndTime = new Date('2012-12-12 12:12:12')
    expect(
      getFormattedDate({
        scheduledStartTime,
        scheduledEndTime
      })
    ).toEqual('10 November - 12 December 2012')
  })
})
