
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  fetchChatbots, 
  fetchChatbot, 
  createChatbot, 
  updateChatbot, 
  deleteChatbot, 
  duplicateChatbot,
  updateChatbotStatus, 
  fetchChatbotResponses,
  createChatbotResponse,
  updateChatbotResponse,
  deleteChatbotResponse,
  fetchChatbotAnalytics,
  type Chatbot,
  type ChatbotResponse,
  type ChatbotAnalyticsData
} from '@/services/chatbotService';
import { useToast } from '@/hooks/use-toast';

export const useChatbots = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch all chatbots
  const { 
    data: chatbots = [], 
    isLoading: isLoadingChatbots, 
    error: chatbotsError,
    refetch: refetchChatbots
  } = useQuery({
    queryKey: ['chatbots'],
    queryFn: fetchChatbots,
  });

  // Fetch single chatbot
  const fetchSingleChatbot = (id: string) => {
    return useQuery({
      queryKey: ['chatbot', id],
      queryFn: () => fetchChatbot(id),
      enabled: !!id
    });
  };

  // Create new chatbot
  const createChatbotMutation = useMutation({
    mutationFn: (chatbot: Partial<Chatbot>) => createChatbot(chatbot),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatbots'] });
      toast({
        title: "Chatbot created",
        description: "Your chatbot has been created successfully."
      });
    }
  });

  // Update chatbot
  const updateChatbotMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: Partial<Chatbot> }) => updateChatbot(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['chatbots'] });
      queryClient.invalidateQueries({ queryKey: ['chatbot', variables.id] });
      toast({
        title: "Chatbot updated",
        description: "Your chatbot has been updated successfully."
      });
    }
  });

  // Delete chatbot
  const deleteChatbotMutation = useMutation({
    mutationFn: (id: string) => deleteChatbot(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatbots'] });
      toast({
        title: "Chatbot deleted",
        description: "Your chatbot has been deleted successfully."
      });
    }
  });

  // Duplicate chatbot
  const duplicateChatbotMutation = useMutation({
    mutationFn: (id: string) => duplicateChatbot(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatbots'] });
      toast({
        title: "Chatbot duplicated",
        description: "Your chatbot has been duplicated successfully."
      });
    }
  });

  // Update chatbot status - Fixed this to pass just the params object
  const updateChatbotStatusMutation = useMutation({
    mutationFn: (params: { id: string, status: 'active' | 'draft' | 'paused' }) => updateChatbotStatus(params),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['chatbots'] });
      queryClient.invalidateQueries({ queryKey: ['chatbot', variables.id] });
      toast({
        title: "Status updated",
        description: `Chatbot is now ${variables.status}.`
      });
    }
  });

  // Fetch chatbot responses
  const fetchChatbotResponsesQuery = (chatbotId: string) => {
    return useQuery({
      queryKey: ['chatbot-responses', chatbotId],
      queryFn: () => fetchChatbotResponses(chatbotId),
      enabled: !!chatbotId
    });
  };

  // Create chatbot response
  const createChatbotResponseMutation = useMutation({
    mutationFn: (response: Partial<ChatbotResponse>) => createChatbotResponse(response),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['chatbot-responses', variables.chatbot_id] });
      toast({
        title: "Response added",
        description: "New response has been added successfully."
      });
    }
  });

  // Update chatbot response
  const updateChatbotResponseMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: Partial<ChatbotResponse> }) => updateChatbotResponse(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['chatbot-responses', variables.data.chatbot_id] });
      toast({
        title: "Response updated",
        description: "Response has been updated successfully."
      });
    }
  });

  // Delete chatbot response
  const deleteChatbotResponseMutation = useMutation({
    mutationFn: ({ id, chatbotId }: { id: string, chatbotId: string }) => deleteChatbotResponse(id).then(result => ({ result, chatbotId })),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['chatbot-responses', variables.chatbotId] });
      toast({
        title: "Response deleted",
        description: "Response has been deleted successfully."
      });
    }
  });

  // Fetch chatbot analytics
  const fetchChatbotAnalyticsQuery = (chatbotId: string) => {
    return useQuery({
      queryKey: ['chatbot-analytics', chatbotId],
      queryFn: () => fetchChatbotAnalytics(chatbotId),
      enabled: !!chatbotId
    });
  };

  return {
    // Queries
    chatbots,
    isLoadingChatbots,
    chatbotsError,
    refetchChatbots,
    fetchSingleChatbot,
    fetchChatbotResponsesQuery,
    fetchChatbotAnalyticsQuery,
    
    // Mutations
    createChatbot: createChatbotMutation.mutate,
    updateChatbot: updateChatbotMutation.mutate,
    deleteChatbot: deleteChatbotMutation.mutate,
    duplicateChatbot: duplicateChatbotMutation.mutate,
    updateChatbotStatus: updateChatbotStatusMutation.mutate,
    createChatbotResponse: createChatbotResponseMutation.mutate,
    updateChatbotResponse: updateChatbotResponseMutation.mutate,
    deleteChatbotResponse: deleteChatbotResponseMutation.mutate,
    
    // Loading states
    isCreating: createChatbotMutation.isPending,
    isUpdating: updateChatbotMutation.isPending,
    isDeleting: deleteChatbotMutation.isPending,
    isDuplicating: duplicateChatbotMutation.isPending,
    isUpdatingStatus: updateChatbotStatusMutation.isPending,
    isCreatingResponse: createChatbotResponseMutation.isPending,
    isUpdatingResponse: updateChatbotResponseMutation.isPending,
    isDeletingResponse: deleteChatbotResponseMutation.isPending,
  };
};
