import { useQueryClient } from '@tanstack/react-query';

import useAuthMutation from '@hooks/useAuthMutation';
import { clientAxios } from '@utils/commonAxios';

const cancelApplication = (groupArticleId: number) =>
  clientAxios.post('/v1/group-applications/cancel', { groupArticleId });

const useCancelApplication = (groupArticleId: number) => {
  const queryClient = useQueryClient();
  return useAuthMutation(cancelApplication, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['applicationStatus', groupArticleId]);
      // TODO 신청 인원 invalidate
    },
  });
};

export default useCancelApplication;
