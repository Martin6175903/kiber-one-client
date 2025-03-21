import { axiosWithAuth } from '@/src/api/api.interceptors'
import { IFile } from '@/src/shared/types/file.types'
import { API_URL } from '@/src/config/api.config'

class FileService {
	async upload(file: FormData, folder?: string) {
		const { data } = await axiosWithAuth<IFile[]>({
			url: API_URL.files(),
			method: 'POST',
			data: file,
			params: { folder },
			headers: { 'Content-Type': 'multipart/form-data' }
		})

		return data
	}
}

export const fileService = new FileService()