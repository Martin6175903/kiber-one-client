import { EnumGroupCategory } from '@/src/shared/types/group.types'

export const switchAgeCategory = (category: EnumGroupCategory) => {
	switch (category) {
		case EnumGroupCategory.YOUNGER:
			return 'Младшие'
		case EnumGroupCategory.MEDIUM:
			return 'Средние'
		case EnumGroupCategory.ADULTS:
			return 'Старшие'
		default:
			return 'Не указано'
	}
}
